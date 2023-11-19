import { useState } from 'react';
import './C_App.css';
import Header from './Customer_Header';
import Sidebar from './Customer_Sidebar';
import Home from './Customer_Home';
import C_Feedback from './C_Feedback';
import C_Credentials from './C_Credentials';
import C_Shop from './C_Shop';
import C_Cart from './C_Cart';
import C_Wishlist from './C_Wishlist';
import C_Orders from './C_Orders';
import C_PaymentHistory from './C_PaymentHistory';
import C_ForYou from './C_ForYou';
import C_Refund from './C_Refund';
import C_Support from './C_Support';
import C_CustomerInfo from './C_CustomerInfo';
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
          <Route path="/C_Feedback" element={<C_Feedback />} />
          <Route path="/C_Credentials" element={<C_Credentials />} />
          <Route path="/C_Shop" element={<C_Shop />} />
          <Route path="/C_Cart" element={<C_Cart />} />
          <Route path="/C_Wishlist" element={<C_Wishlist />} />
          <Route path="/C_Orders" element={<C_Orders />} />
          <Route path="/C_PaymentHistory" element={<C_PaymentHistory />} />
          <Route path="/C_ForYou" element={<C_ForYou />} />
          <Route path="/C_Refund" element={<C_Refund />} />
          <Route path="/C_Support" element={<C_Support />} />
          <Route path="/C_CustomerInfo" element={<C_CustomerInfo />} />
          
        </Routes>
      </div>

  );
}

export default App;
