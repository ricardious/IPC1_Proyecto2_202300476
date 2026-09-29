import { useState } from "react";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCommentsRequest, createCommentRequest } from "../api/auth";
import Avatar from "./Avatar";

function Comments({ postId }) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsRequest(postId).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (comment) => createCommentRequest(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setText("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    mutation.mutate({ postId, text });
  };

  const comments = Array.isArray(data) ? data : [];

  return (
    <div className="mt-4 border-t border-themify-border pt-4">
      {isLoading ? (
        <p className="text-sm text-themify-textColorSoft">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-themify-textColorSoft">
          No comments yet. Be the first one!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar name={comment.name} size={32} />
              <div className="rounded-2xl bg-themify-bgSoft px-3 py-2">
                <div className="text-sm leading-tight">
                  <span className="font-semibold">{comment.name}</span>{" "}
                  <span className="text-xs text-themify-textColorSoft">
                    {comment.carrera}
                    {comment.facultad ? ` (${comment.facultad})` : ""}
                  </span>
                </div>
                <p className="text-sm">{comment.text}</p>
                <span className="text-[11px] text-themify-textColorSoft">
                  {moment(comment.date).fromNow()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full rounded-full bg-themify-bgSoft px-4 py-2 text-sm outline-none placeholder:text-themify-textColorSoft"
        />
        <button
          type="submit"
          disabled={mutation.isPending || !text.trim()}
          className="rounded-full bg-blue-600 px-4 py-1.5 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Comments;
