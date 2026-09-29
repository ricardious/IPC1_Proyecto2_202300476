import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import instance from "../api/axios";
import { createPostRequest } from "../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AVATAR } from "./Navbar";

export const CATEGORIES = [
  "Anuncio Importante",
  "Divertido",
  "Académico",
  "Variedad",
];

function Share() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await instance.post("/upload", formData);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: (newPost) => createPostRequest(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDescription("");
      setCategory("");
      setAnonymous(false);
      setFile(null);
      setError("");
    },
    onError: (err) => {
      const data = err.response?.data;
      setError(Array.isArray(data) ? data.join(", ") : "The post could not be published");
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Description is required");
      return;
    }
    if (!category) {
      setError("Category is required");
      return;
    }

    let imgUrl = "";
    try {
      if (file) imgUrl = await upload();
    } catch {
      setError("The image could not be uploaded");
      return;
    }

    mutation.mutate({
      description,
      category,
      image: imgUrl,
      anonymous,
    });
  };

  return (
    <div className="rounded-xl bg-themify-bg p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={AVATAR}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder={`What's on your mind, ${user?.nombres || ""}?`}
          className="w-full rounded-full bg-themify-bgSoft px-4 py-2 text-sm outline-none placeholder:text-themify-textColorSoft"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      {file && (
        <div className="mt-3">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="max-h-64 w-full rounded-lg object-cover"
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-themify-textColorSoft">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-themify-border bg-themify-bg px-2 py-1 text-sm outline-none"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="h-4 w-4"
          />
          <span>Publish anonymously</span>
        </label>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <hr className="my-4 border-themify-border" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 sm:gap-6">
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <div className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-sm hover:bg-themify-bgSoft">
              <img src={Image} alt="" className="h-5" />
              <span>Add Image</span>
            </div>
          </label>
          <div className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-sm hover:bg-themify-bgSoft">
            <img src={Map} alt="" className="h-5" />
            <span>Add Place</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-sm hover:bg-themify-bgSoft">
            <img src={Friend} alt="" className="h-5" />
            <span>Tag Friends</span>
          </div>
        </div>
        <button
          className="rounded-full bg-blue-600 px-5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          onClick={handleClick}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sharing..." : "Share"}
        </button>
      </div>
    </div>
  );
}

export default Share;
