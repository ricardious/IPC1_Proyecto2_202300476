import Avatar from "./Avatar";

// NOTA: esta barra lateral es solo de diseño. Los nombres son ficticios
// (no corresponden a usuarios reales de la base de datos).
function RightBar() {
  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] flex-[3] overflow-y-auto pb-4 lg:block">
      <div className="rounded-xl bg-themify-bg p-4 shadow-sm">
        <span className="text-sm text-themify-textColorSoft">
          Suggestions For You (demo)
        </span>
        <div className="mt-3 flex flex-col gap-3">
          <UserItem name="Mario Estrada" />
          <UserItem name="Paula Solís" />
        </div>

        <hr className="my-4 border-themify-border" />

        <span className="text-sm text-themify-textColorSoft">
          Latest Activities (demo)
        </span>
        <div className="mt-3 flex flex-col gap-3">
          <ActivityItem
            user="Mario Estrada"
            action="changed their cover picture"
            time="1 min ago"
          />
          <ActivityItem
            user="Paula Solís"
            action="liked your post"
            time="5 min ago"
          />
          <ActivityItem
            user="Andrés Girón"
            action="started following you"
            time="20 min ago"
          />
        </div>

        <hr className="my-4 border-themify-border" />

        <span className="text-sm text-themify-textColorSoft">
          Online Friends (demo)
        </span>
        <div className="mt-3 flex flex-col gap-3">
          <OnlineFriendItem name="Mario Estrada" />
          <OnlineFriendItem name="Paula Solís" />
          <OnlineFriendItem name="Andrés Girón" />
          <OnlineFriendItem name="Sofía Arévalo" />
          <OnlineFriendItem name="Diego Fuentes" />
        </div>
      </div>
    </aside>
  );
}

const UserItem = ({ name }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={name} size={36} />
        <span className="truncate text-sm">{name}</span>
      </div>
      <div className="flex gap-2">
        <button className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600">
          Follow
        </button>
        <button className="rounded-md bg-themify-bgSoft px-3 py-1 text-xs hover:bg-red-500 hover:text-white">
          Dismiss
        </button>
      </div>
    </div>
  );
};

const ActivityItem = ({ user, action, time }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={user} size={36} />
        <p className="truncate text-sm">
          <span className="font-semibold">{user}</span> {action}
        </p>
      </div>
      <span className="whitespace-nowrap text-xs text-themify-textColorSoft">
        {time}
      </span>
    </div>
  );
};

const OnlineFriendItem = ({ name }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar name={name} size={36} />
        <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-themify-bg bg-green-500" />
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
};

export default RightBar;
