import 
{BsPeopleFill, BsInfoCircleFill}
 from 'react-icons/bs'
 import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RiMotorbikeFill, RiLockPasswordFill  } from 'react-icons/ri';
import { BiSolidExit } from 'react-icons/bi';
import { MdOutlineRateReview } from "react-icons/md";


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
            <Link className='icon' to="/A_Users">
                <BsPeopleFill className='icon' /> Manage Users
            </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link className='icon' to="/A_Mi">
                <BsInfoCircleFill className='icon' /> Mechanic Info
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/A_Reviews">
                <MdOutlineRateReview className='icon' /> Reviews
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