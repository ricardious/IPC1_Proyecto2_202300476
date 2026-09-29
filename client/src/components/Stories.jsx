import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

function Stories() {
  const { user } = useAuth();

  // TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Ana María",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      name: "Carlos Alberto",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      name: "Luisa Fernanda",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 4,
      name: "Pedro José",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 5,
      name: "Laura Gabriela",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 6,
      name: "Javier Alejandro",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {/* Create story */}
      <div className="flex h-48 w-28 flex-shrink-0 flex-col items-center justify-start gap-2 overflow-hidden rounded-xl bg-themify-bg pt-3 shadow-sm">
        <Avatar name={user?.nombres || "User"} size={44} />
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-themify-bg bg-blue-600 text-xl leading-none text-white">
          +
        </span>
        <span className="text-xs font-medium">Create story</span>
      </div>

      {stories.map((story) => (
        <div
          key={story.id}
          className="relative h-48 w-28 flex-shrink-0 overflow-hidden rounded-xl shadow-sm"
        >
          <img
            src={story.img}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-2 left-2 right-2 truncate text-xs font-medium text-white">
            {story.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Stories;
