import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMarkEmailUnread } from "react-icons/md";
import Cookies from 'js-cookie';
const UserPage = () => {
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
      const [user,setUser] = useState('');
      const [useremail,setUseremail] = useState('');
    useEffect(() => {
        setUser(Cookies.get('username'));
        setUseremail(Cookies.get('useremail'));
        // console.log(Cookies.get('useremail'))
    }, [])
    

  return (
<>
<div className='bg-zinc-900/80 min-h-screen flex justify-center items-center'>
<div
    className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto bg-gray-100 shadow-2xl hover:-translate-y-5 duration-300 md:mx-auto lg:mx-auto xl:mx-auto rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://c4.wallpaperflare.com/wallpaper/291/819/697/illustration-city-anime-painting-wallpaper-preview.jpg' alt='Mountain'/>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4  border-zinc-500 rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src='https://img.freepik.com/free-vector/social-network-online-dating-service-chatting-internet-communication-girl-cartoon-character-looking-profiles-with-photo-social-media-concept-illustration_335657-2041.jpg?t=st=1732879705~exp=1732883305~hmac=cd34ef9eb1093f683f2f6f9889a21bd27d0a560c34220a447ddabe8ded53ad79&w=740' alt='Woman looking front'/>
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold">{user}</h2>
        <p className="text-gray-500">
          <span className='bg-yellow-500 px-5 rounded-full text-white'>Moderator</span>
        </p>
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
            <MdMarkEmailUnread />
            <div>{useremail}</div>
        </li>
    </ul>
    <div className="p-4 border-t-2  mx-8 mt-2">
        <button onClick={handleLogout} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Log Out</button>

    </div>
</div>
</div>
</>
  );
};

export default UserPage;
