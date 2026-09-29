import React, { useState } from 'react';
import Table from "../components/Table";
import ModalWindow from "../components/ModalWindow";
import LeftBar from '../components/LeftBar';

function Admin() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(!showModal);
      };
    
      const handleCloseModal = () => {
        setShowModal(!showModal);
      };



  return (
    <div className="bg-bgColor h-screen overflow-hidden">
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 lg:rounded-lg">
        <Table />
      </div>
      <ModalWindow
      show={showModal}
      onClose={setShowModal}
      >
        <div className="flex flex-col items-center">
          <p className=" text-black mb-6">Are you sure you want to delete this user?</p>
          <button
            className="px-6 py-2 rounded-[5px] text-white font-bold bg-red-500 hover:bg-red-600 transition-colors duration-300"

          >
            Delete
          </button>
        </div>
      </ModalWindow>
    </div>
  );
}

export default Admin;