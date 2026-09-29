import { useContext } from "react";

import Friends from '../assets/1.png';
import Groups from '../assets/2.png';
import Market from '../assets/3.png';
import Watch from '../assets/4.png';
import Memories from '../assets/5.png';
import Events from '../assets/6.png';
import Gaming from '../assets/7.png';
import Gallery from '../assets/8.png';
import Videos from '../assets/9.png';
import Messages from '../assets/10.png';
import Tutorials from '../assets/11.png';
import Courses from '../assets/12.png';
import Fund from '../assets/13.png';

function LeftBar(){
  return (
    <div className="flex-[2] sticky top-[70px] h-[calc(100vh-5rem)] hidden md:block">
      <div className="p-5">
        <div className="space-y-3">
          <div className="flex space-x-3">
            <img  alt="" className="w-8 h-8 rounded-full" />
            <span >Ricardious</span>
          </div>
          <div className="flex flex-col space-y-3">
            <MenuItem image={Friends} text="Friends" />
            <MenuItem image={Groups} text="Groups" />
            <MenuItem image={Market} text="Marketplace" />
            <MenuItem image={Watch} text="Watch" />
            <MenuItem image={Memories} text="Memories" />
          </div>
        </div>
        <hr className="my-4 border-themify-border" />
        <div className="space-y-3">
          <span className="block">Your shortcuts</span>
          <MenuItem image={Events} text="Events" />
          <MenuItem image={Gaming} text="Gaming" />
          <MenuItem image={Gallery} text="Gallery" />
          <MenuItem image={Videos} text="Videos" />
          <MenuItem image={Messages} text="Messages" />
        </div>
        <hr className="my-4 border-themify-border" />
        <div className="space-y-3">
          <span className="block">Others</span>
          <MenuItem image={Fund} text="Fundraiser" />
          <MenuItem image={Tutorials} text="Tutorials" />
          <MenuItem image={Courses} text="Courses" />
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ image, text }) => {
  return (
    <div className="flex items-center space-x-3 text-black">
      <img src={image} alt="" className="w-8 h-8" />
      <span>{text}</span>
    </div>
  );
};

export default LeftBar;
