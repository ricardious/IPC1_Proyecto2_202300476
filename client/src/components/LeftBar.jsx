import { useAuth } from "../context/AuthContext";
import { AVATAR } from "./Navbar";

import Friends from "../assets/1.png";
import Groups from "../assets/2.png";
import Market from "../assets/3.png";
import Watch from "../assets/4.png";
import Memories from "../assets/5.png";
import Events from "../assets/6.png";
import Gaming from "../assets/7.png";
import Gallery from "../assets/8.png";
import Videos from "../assets/9.png";
import Messages from "../assets/10.png";
import Tutorials from "../assets/11.png";
import Courses from "../assets/12.png";
import Fund from "../assets/13.png";

function LeftBar() {
  const { user } = useAuth();

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] flex-[2] overflow-y-auto pb-4 md:block">
      <div className="rounded-xl bg-themify-bg p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={AVATAR}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-medium">{user?.nombres || "User"}</span>
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <MenuItem image={Friends} text="Friends" />
          <MenuItem image={Groups} text="Groups" />
          <MenuItem image={Market} text="Marketplace" />
          <MenuItem image={Watch} text="Watch" />
          <MenuItem image={Memories} text="Memories" />
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-themify-bg p-4 shadow-sm">
        <span className="text-sm text-themify-textColorSoft">Your shortcuts</span>
        <div className="mt-3 flex flex-col gap-1">
          <MenuItem image={Events} text="Events" />
          <MenuItem image={Gaming} text="Gaming" />
          <MenuItem image={Gallery} text="Gallery" />
          <MenuItem image={Videos} text="Videos" />
          <MenuItem image={Messages} text="Messages" />
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-themify-bg p-4 shadow-sm">
        <span className="text-sm text-themify-textColorSoft">Others</span>
        <div className="mt-3 flex flex-col gap-1">
          <MenuItem image={Fund} text="Fundraiser" />
          <MenuItem image={Tutorials} text="Tutorials" />
          <MenuItem image={Courses} text="Courses" />
        </div>
      </div>
    </aside>
  );
}

const MenuItem = ({ image, text }) => {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-themify-bgSoft">
      <img src={image} alt="" className="h-7 w-7" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default LeftBar;
