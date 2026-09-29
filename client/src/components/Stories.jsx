

function Stories(){


  // TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
        id: 5,
        name: "John Doe",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      },
      {
        id: 6,
        name: "John Doe",
        img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      },
  ];

  return (
    <div className="flex  gap-2.5 h-[250px] mb-[30px]">
      <div className="flex-[1] rounded-[10px] overflow-hidden relative">
        <img alt="" className="w-full h-full object-cover" />
        <span className="absolute bottom-2.5 left-2.5 text-white font-medium">
          Ricardious
        </span>
        <button className="absolute bottom-10 left-2.5 text-white bg-blue-800 rounded-[50%] w-[30px] h-[30px] cursor-pointer text-[30px] flex items-center justify-center">
          +
        </button>
      </div>
      {stories.map(story => (
        <div key={story.id} className="flex-[1] rounded overflow-hidden relative">
          <img src={story.img} alt="" className="w-full h-full object-cover" />
          <span className="absolute bottom-2.5 left-2.5 text-white font-medium">
            {story.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Stories


