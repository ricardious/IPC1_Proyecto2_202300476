import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import instance from "../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AVATAR } from "./Navbar";

function Share() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await instance.post("/upload", formData);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: (newPost) => instance.post("/addPost", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    try {
      if (file) imgUrl = await upload();
      mutation.mutate({
        userId: user?.codigo ?? user?.carnet,
        name: user?.nombres,
        description,
        image: imgUrl,
      });
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error(error);
    }
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
