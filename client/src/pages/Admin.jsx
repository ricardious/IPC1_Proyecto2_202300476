import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import ModalWindow from "../components/ModalWindow";
import {
  getUsersRequest,
  deleteUserRequest,
  getPostsRequest,
  deletePostRequest,
  exportUsersRequest,
  exportPostsRequest,
} from "../api/auth";

const userColumns = [
  { key: "carnet", header: "Code" },
  { key: "nombres", header: "First Names" },
  { key: "apellidos", header: "Last Names" },
  { key: "genero", header: "Gender" },
  { key: "facultad", header: "Faculty" },
  { key: "carrera", header: "Major" },
  { key: "correo", header: "Email" },
  { key: "role", header: "Role" },
];

const postColumns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Author" },
  { key: "category", header: "Category" },
  {
    key: "anonymous",
    header: "Anonymous",
    render: (post) => (post.anonymous ? "Yes" : "No"),
  },
  {
    key: "description",
    header: "Description",
    render: (post) => (
      <span className="line-clamp-1 block max-w-[240px] truncate">
        {post.description}
      </span>
    ),
  },
  {
    key: "likesCount",
    header: "Likes",
  },
  {
    key: "commentsCount",
    header: "Comments",
  },
];

function Admin() {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [error, setError] = useState("");

  const loadUsers = () =>
    getUsersRequest()
      .then((res) => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Users could not be loaded"));

  const loadPosts = () =>
    getPostsRequest()
      .then((res) => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Posts could not be loaded"));

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setError("");
    try {
      if (pendingDelete.type === "users") {
        await deleteUserRequest(pendingDelete.row.carnet);
        await loadUsers();
      } else {
        await deletePostRequest(pendingDelete.row.id);
        await loadPosts();
      }
    } catch {
      setError("The element could not be deleted");
    } finally {
      setPendingDelete(null);
    }
  };

  const handleExport = async (type) => {
    setError("");
    try {
      const res = type === "users" ? await exportUsersRequest() : await exportPostsRequest();
      const url = URL.createObjectURL(
        new Blob([res.data], { type: "text/csv;charset=utf-8" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setError("The CSV could not be exported");
    }
  };

  const tabClass = (value) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
      tab === value
        ? "bg-blue-600 text-white"
        : "bg-themify-bg text-themify-textColor hover:bg-themify-bgSoft"
    }`;

  return (
    <div className="min-h-screen bg-themify-bgSoft text-themify-textColor">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex gap-2">
            <button className={tabClass("users")} onClick={() => setTab("users")}>
              Users
            </button>
            <button className={tabClass("posts")} onClick={() => setTab("posts")}>
              Posts
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            onClick={() => handleExport(tab)}
          >
            Export {tab === "users" ? "users" : "posts"} to CSV
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-500 p-2 text-sm text-white">
            {error}
          </div>
        )}

        {tab === "users" ? (
          <Table
            columns={userColumns}
            data={users.filter((user) => user.role !== "admin")}
            onView={setSelected}
            onDelete={(row) => setPendingDelete({ type: "users", row })}
            emptyText="No users registered"
          />
        ) : (
          <Table
            columns={postColumns}
            data={posts}
            onView={setSelected}
            onDelete={(row) => setPendingDelete({ type: "posts", row })}
            emptyText="No posts published"
          />
        )}
      </div>

      {/* Detail modal */}
      <ModalWindow
        show={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.role ? "User details" : "Post details"}
      >
        {selected?.role ? (
          <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <Detail label="Code" value={selected.carnet} />
            <Detail label="Role" value={selected.role} />
            <Detail label="First Names" value={selected.nombres} />
            <Detail label="Last Names" value={selected.apellidos} />
            <Detail label="Gender" value={selected.genero} />
            <Detail label="Email" value={selected.correo} />
            <Detail label="Faculty" value={selected.facultad} />
            <Detail label="Major" value={selected.carrera} />
          </dl>
        ) : selected ? (
          <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <Detail label="ID" value={selected.id} />
            <Detail label="Author" value={selected.name} />
            <Detail label="Category" value={selected.category} />
            <Detail label="Anonymous" value={selected.anonymous ? "Yes" : "No"} />
            <Detail label="Likes" value={selected.likesCount} />
            <Detail label="Comments" value={selected.commentsCount} />
            <Detail
              label="Date"
              value={selected.date ? new Date(selected.date).toLocaleString() : ""}
            />
            <div className="sm:col-span-2">
              <dt className="text-themify-textColorSoft">Description</dt>
              <dd>{selected.description}</dd>
            </div>
          </dl>
        ) : null}
      </ModalWindow>

      {/* Delete confirmation modal */}
      <ModalWindow
        show={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Confirm deletion"
      >
        <p className="mb-6 text-sm">
          Are you sure you want to delete this{" "}
          {pendingDelete?.type === "users" ? "user" : "post"}?
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="rounded-md bg-themify-bgSoft px-4 py-2 text-sm hover:bg-themify-border"
            onClick={() => setPendingDelete(null)}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </ModalWindow>
    </div>
  );
}

const Detail = ({ label, value }) => (
  <div>
    <dt className="text-themify-textColorSoft">{label}</dt>
    <dd>{value ?? "-"}</dd>
  </div>
);

export default Admin;
