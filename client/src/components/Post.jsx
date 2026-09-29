
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import moment from 'moment';

import { useState } from "react";

function Post({ post }){


  //TEMPORARY
  const liked = false;

  return (
    <div className="post shadow-lg rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="container p-5">
        <div className="user flex justify-between items-center">
          <div className="userInfo flex items-center gap-4"> 
            <img src="https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg" alt="" className="w-10 h-10 rounded-full object-cover" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name font-semibold block">{post.name}</span>
              </Link>
              <span className="date text-sm">{moment(post.date).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content mt-5">
          <p>{post.description}</p>
          <img src={"./upload/"+post.image} alt="" className="w-full max-h-96 object-cover mt-5" />
        </div>
        <div className="info flex items-center gap-4 mt-5">
          <div className="item flex items-center gap-2 cursor-pointer text-sm" onClick={() => setLiked(!liked)}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            <span className="likes">12 Likes</span>
          </div>
          <div className="item flex items-center gap-2 cursor-pointer text-sm" >
            <TextsmsOutlinedIcon />
            <span className="comments">12 Comments</span>
          </div>
          <div className="item flex items-center gap-2 cursor-pointer text-sm">
            <ShareOutlinedIcon />
            <span className="share">Share</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Post;
