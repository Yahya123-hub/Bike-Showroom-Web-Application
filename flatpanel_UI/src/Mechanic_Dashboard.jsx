import { useState } from 'react';
import './M_App.css';
import Header from './Mechanic_Header';
import Sidebar from './Mechanic_Sidebar';
import Home from './Mechanic_Home';
import M_Apply from './M_Apply';
import M_Sell from './M_Sell';
import M_Reports from './M_Reports';
import M_Credentials from './M_Credentials';
import M_Listings from './M_Listings'
import M_Update from './M_Update'
//import SISU from './SignupSigninApp';
import {  Routes, Route  } from 'react-router-dom';


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
          <Route path="/M_Apply" element={<M_Apply />} />
          <Route path="/M_Sell" element={<M_Sell />} />
          <Route path="/M_Reports" element={<M_Reports />} />
          <Route path="/M_Credentials" element={<M_Credentials />}/>
          <Route path="/M_Listings" element={<M_Listings />}/>
          <Route path="/M_Update/:id" element={<M_Update />}/>

          
          {/*<Route path="/logout" element={<SISU />} />*/}
        </Routes>
      </div>
  );
}

export default App;
