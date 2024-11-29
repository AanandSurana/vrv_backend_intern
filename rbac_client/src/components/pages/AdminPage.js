import React from 'react';
import User from '../User';
import Sidebar from '../Sidebar';

const AdminPage = () => {
  return (
      <div className="lg:flex md:flex">
        <Sidebar />
        <div className="flex-grow overflow-scroll h-screen scrollbar-hide">
            <User/>
        </div>
      </div>
  );
};

export default AdminPage;
