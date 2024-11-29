import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../ProfileIcon';
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
        <img className="object-cover object-center h-32" src='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1732876756~exp=1732880356~hmac=1bfe1c86d1aeb6f87481ced9ebdacc2ad49e1ade05f126a65905244fc6f1e41a&w=740' alt='Woman looking front'/>
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold">{user}</h2>
        <p className="text-gray-500">Normal User</p>
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>{useremail}</div>
        </li>
        {/* <li className="flex flex-col items-center justify-between">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>10k</div>
        </li>
        <li className="flex flex-col items-center justify-around">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <div>15</div>
        </li> */}
    </ul>
    <div className="p-4 border-t mx-8 mt-2">
        <button onClick={handleLogout} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Log Out</button>

    </div>
</div>
</div>
</>
  );
};

export default UserPage;
