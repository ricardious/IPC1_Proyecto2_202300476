import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AVATAR } from "./Navbar";
import Comments from "./Comments";
import { toggleLikeRequest } from "../api/auth";

const CATEGORY_STYLES = {
  "Anuncio Importante":
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Divertido:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200",
  Académico:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Variedad:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
  const [showComments, setShowComments] = useState(false);

  const likeMutation = useMutation({
    mutationFn: () => toggleLikeRequest(post.id),
    onSuccess: (res) => {
      const isLiked = Boolean(res.data?.liked);
      setLiked(isLiked);
      setLikesCount((count) => Math.max(0, count + (isLiked ? 1 : -1)));
    },
  });

  const hasImage = typeof post.image === "string" && post.image.trim() !== "";
  const categoryClass = CATEGORY_STYLES[post.category] || CATEGORY_STYLES.Variedad;

  return (
    <div className="rounded-xl bg-themify-bg p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <img
            src={AVATAR}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <Link to="/profile" className="block font-semibold hover:underline">
              {post.name}
            </Link>
            <span className="block text-xs text-themify-textColorSoft">
              {post.carrera}
              {post.facultad ? ` (${post.facultad})` : ""}
            </span>
            {post.date && (
              <span className="text-xs text-themify-textColorSoft">
                {moment(post.date).fromNow()}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.category && (
            <span
              className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${categoryClass}`}
            >
              {post.category}
            </span>
          )}
          <button className="rounded-full p-1 hover:bg-themify-bgSoft">
            <MoreHorizIcon fontSize="small" />
          </button>
        </div>
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
          className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-themify-bgSoft disabled:opacity-60"
          onClick={() => likeMutation.mutate()}
          disabled={likeMutation.isPending}
        >
          {liked ? (
            <FavoriteOutlinedIcon className="text-red-500" fontSize="small" />
          ) : (
            <FavoriteBorderOutlinedIcon fontSize="small" />
          )}
          <span>{likesCount} Likes</span>
        </button>
        <button
          className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-themify-bgSoft"
          onClick={() => setShowComments((value) => !value)}
        >
          <TextsmsOutlinedIcon fontSize="small" />
          <span>{post.commentsCount ?? 0} Comments</span>
        </button>
        <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-themify-bgSoft">
          <ShareOutlinedIcon fontSize="small" />
          <span>Share</span>
        </button>
      </div>

      {showComments && <Comments postId={post.id} />}
    </div>
  );
}

export default Post;
