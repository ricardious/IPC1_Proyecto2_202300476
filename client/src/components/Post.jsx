import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { AVATAR } from "./Navbar";

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const toggleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  const hasImage =
    typeof post.image === "string" && post.image.trim() !== "";

  return (
    <div className="rounded-xl bg-themify-bg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={AVATAR}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <Link
              to="/profile"
              className="block font-semibold hover:underline"
            >
              {post.name}
            </Link>
            {post.date && (
              <span className="text-xs text-themify-textColorSoft">
                {moment(post.date).fromNow()}
              </span>
            )}
          </div>
        </div>
        <button className="rounded-full p-1 hover:bg-themify-bgSoft">
          <MoreHorizIcon />
        </button>
      </div>

      {post.description && <p className="mt-4 text-sm">{post.description}</p>}

      {hasImage && (
        <img
          src={`/upload/${post.image}`}
          alt=""
          className="mt-4 max-h-96 w-full rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className="mt-4 flex items-center gap-6 text-sm">
        <button
          className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-themify-bgSoft"
          onClick={toggleLike}
        >
          {liked ? (
            <FavoriteOutlinedIcon className="text-red-500" fontSize="small" />
          ) : (
            <FavoriteBorderOutlinedIcon fontSize="small" />
          )}
          <span>{likes} Likes</span>
        </button>
        <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-themify-bgSoft">
          <TextsmsOutlinedIcon fontSize="small" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-themify-bgSoft">
          <ShareOutlinedIcon fontSize="small" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default Post;
