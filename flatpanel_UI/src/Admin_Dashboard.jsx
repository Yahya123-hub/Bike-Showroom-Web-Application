import { useState } from 'react';
import './A_App.css';
import Header from './Admin_Header';
import Sidebar from './Admin_Sidebar';
import Home from './Admin_Home';
import A_Users from './A_Users';
import A_Mi from './A_Mi';
import A_Credentials from './A_Credentials';
import A_AddUsers from './A_AddUsers';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };


  return (
      <div className='grid-container'> 
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/A_Users" element={<A_Users />} />
          <Route path="/A_Mi" element={<A_Mi />} />
          <Route path="/A_Credentials" element={<A_Credentials />} />
          <Route path="/A_AddUser" element={<A_AddUsers />} />
        </Routes>
      </div>
  );
}

export default App;
