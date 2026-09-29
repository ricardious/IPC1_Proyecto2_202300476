import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext, useState } from "react";
import {AuthContext } from "../context/AuthContext";
import instance from "../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function Share() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const upload = async () => {

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await instance.post("/upload", formData);
      return res.data;
    } catch (error) {
      
    }
  }

  const {user} = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return instance.post("/addPost", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    }
  }); // Faltaba este paréntesis de cierre


  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ userId: user.id, name: user.nombres, description, image: imgUrl });
    setDescription("");
    setFile(null);
  }

  return (
    <div className="share shadow-lg rounded-lg bg-white text-gray-800 mb-20">
      <div className="container p-6">
   
        <div className="top flex items-center gap-6">
          <img
            src="	https://img.icons8.com/nolan/64/react-native.png"
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder={`What's on your mind, ${user.nombres} ?`}
            className="border-none outline-none bg-transparent w-3/5 text-gray-800"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex-1 flex justify-end">
          {file && <img src={URL.createObjectURL(file)} alt="" className="w-25 h-25 object-cover rounded-2" />}
        </div>
  
        <hr className="my-6 border-t border-gray-300" />
        <div className="bottom flex items-center justify-between">
          <div className="left flex items-center gap-6">
            <input type="file" 
            id="file" 
            className="hidden" 
            onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item flex items-center gap-2 cursor-pointer">
                <img src={Image} alt="" className="h-5" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item flex items-center gap-2 cursor-pointer">
              <img src={Map} alt="" className="h-5" />
              <span>Add Place</span>
            </div>
            <div className="item flex items-center gap-2 cursor-pointer">
              <img src={Friend} alt="" className="h-5" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button 
            className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer"
            onClick={handleClick}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
