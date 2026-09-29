import Post from "./Post";
import instance from "../api/axios";
import { useQuery } from "@tanstack/react-query";

function Posts() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => instance.get("/posts").then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="rounded-xl bg-themify-bg p-6 text-center text-sm text-themify-textColorSoft shadow-sm">
        Loading posts...
      </div>
    );
  }

  if (error || !Array.isArray(data)) {
    return (
      <div className="rounded-xl bg-themify-bg p-6 text-center text-sm text-red-500 shadow-sm">
        Something went wrong while loading the posts.
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl bg-themify-bg p-6 text-center text-sm text-themify-textColorSoft shadow-sm">
        No posts yet. Be the first to share something!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((post, index) => (
        <Post post={post} key={`${post.id}-${index}`} />
      ))}
    </div>
  );
}

export default Posts;
