import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RiMotorbikeFill } from 'react-icons/ri';
import { RiLockPasswordFill,RiFeedbackFill,RiRefundFill } from 'react-icons/ri';
import {AiFillShop,AiFillStar} from 'react-icons/ai';
import {FaShoppingCart,FaClipboardList} from 'react-icons/fa'
import {MdPayments} from 'react-icons/md'
import {BiSupport} from 'react-icons/bi'
import {BsFillInfoCircleFill} from 'react-icons/bs'
import { TbJewishStarFilled } from 'react-icons/tb';




function Sidebar({openSidebarToggle, OpenSidebar} ) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""} > 
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <RiMotorbikeFill  className='icon_header'/> Bikes
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>

            <li className='sidebar-list-item'>
                <Link className='icon' to="/C_Shop"> 
                    <AiFillShop className='icon'/> Shop
                </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/C_Cart">
                <FaShoppingCart className='icon' /> Cart
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/C_Wishlist">
                <TbJewishStarFilled className='icon' /> Wishlist
            </Link>
            </li>


            <li className='sidebar-list-item'>
            <Link className='icon' to="/C_Orders">
                <FaClipboardList className='icon' /> Orders
            </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link className='icon' to="/C_PaymentHistory">
                    <MdPayments className='icon'/> Payment History
                </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/C_Refund">
                    <RiRefundFill className='icon'/> Refund
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/C_Feedback">
                <RiFeedbackFill className='icon' /> Feedback
            </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link className='icon' to="/C_Credentials">
                    <RiLockPasswordFill className='icon'/> Reset Password
                </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/C_Support">
                    <BiSupport className='icon'/> Support
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/C_CustomerInfo">
                <BsFillInfoCircleFill className='icon'/> Customer Info 
            </Link>
            </li>
        </ul>
    </aside>
  )
}

Sidebar.propTypes = {
    OpenSidebar: PropTypes.func.isRequired, 
    openSidebarToggle:PropTypes.func.isRequired
  };
  
export default Sidebar