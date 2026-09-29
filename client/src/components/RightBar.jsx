import { useContext } from "react";


function RightBar(){

  return (
    <div className="flex-[3.5] sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-themify-bgSoft hidden md:block">
      <div className="p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="block">Suggestions For You</span>
            <UserItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <UserItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
          </div>
          <hr className="my-4 border-themify-border" />
          <div className="space-y-2">
            <span className="block">Latest Activities</span>
            <ActivityItem user="Ricardious" action="changed their cover picture" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" time="1 min ago" />
            <ActivityItem user="Ricardious" action="changed their cover picture" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" time="1 min ago" />
            <ActivityItem user="Ricardious" action="changed their cover picture" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" time="1 min ago" />
            <ActivityItem user="Ricardious" action="changed their cover picture" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" time="1 min ago" />
          </div>
          <hr className="my-4 border-themify-border" />
          <div className="space-y-2">
            <span className="block">Online Friends</span>
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
            <OnlineFriendItem name="Ricardious" image="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserItem = ({ name, image }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-themify-bg">
      <div className="flex items-center space-x-4">
        <img src={image} alt="" className="w-10 h-10 rounded-full" />
        <span>{name}</span>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">follow</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">dismiss</button>
      </div>
    </div>
  );
};

const ActivityItem = ({ user, action, image, time }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={image} alt="" className="w-10 h-10 rounded-full" />
        <div>
          <p>
            <span className="font-bold">{user}</span> {action}
          </p>
        </div>
      </div>
      <span>{time}</span>
    </div>
  );
};

const OnlineFriendItem = ({ name, image }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img src={image} alt="" className="w-10 h-10 rounded-full" />
        <div className="absolute w-2 h-2 bg-green-500 rounded-full top-0 right-0"></div>
      </div>
      <span>{name}</span>
    </div>
  );
};

export default RightBar;
