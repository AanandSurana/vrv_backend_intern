import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsMenuButtonWideFill } from "react-icons/bs";
import Cookies from "js-cookie";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (true) {
        // Remove token from local storage
        // localStorage.removeItem("authToken");
        Cookies.remove('token');
        Cookies.remove('role');
        Cookies.remove('username');
        Cookies.remove('useremail');
        // Redirect to login page
        navigate("/login");
        
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="md:flex">
      {/* Header for small screens */}
      <div className=" bg-zinc-800 text-white flex justify-between items-center p-4 md:hidden">
        <h1 className="text-lg font-bold">
          <span className="text-rose-400">R</span>BAC (VRV)
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none"
        >
          <BsMenuButtonWideFill />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-zinc-800 text-white w-64 p-4 absolute md:static md:block h-screen md:h-auto transition-transform duration-300 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4 hidden md:block">
          <span className="text-rose-400">R</span>BAC (VRV)
        </h2>


        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
