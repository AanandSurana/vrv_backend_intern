import React from 'react';
import { useNavigate } from 'react-router-dom';
const UnauthorizedPage = () => {
  const navigate  = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-100 gap-10">
      <h1 className="text-3xl font-bold text-red-500">Unauthorized Access ☠️</h1>
      <button className='bg-white px-5 rounded-full hover:scale-110 duration-300 shadow-xl' onClick={()=>(navigate('/'))}> Go to Home</button>
    </div>
  );
};

export default UnauthorizedPage;
