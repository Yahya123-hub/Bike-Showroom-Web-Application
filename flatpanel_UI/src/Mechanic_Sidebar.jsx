import 
{BsFillBriefcaseFill}
 from 'react-icons/bs'
 import PropTypes from 'prop-types';
import { Link} from 'react-router-dom';
import { MdSell } from 'react-icons/md';
import { RiMotorbikeFill } from 'react-icons/ri';
import { BiSolidExit,BiSolidReport } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { SiSalesforce } from 'react-icons/si';


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
            <Link className='icon' to="/M_Apply">
                <BsFillBriefcaseFill className='icon' /> Apply
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/M_Sell">
                <MdSell className='icon' /> Sell
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/M_Listings">
                <SiSalesforce className='icon' /> Listings
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/M_Reports">
                    <BiSolidReport className='icon'/> Reports
            </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link className='icon' to="/M_Credentials">
                <RiLockPasswordFill className='icon' /> Reset Password
            </Link>
            </li>

            <li className='sidebar-list-item'>
            <Link className='icon' to="/logout">
                    <BiSolidExit className='icon'/> Log Out
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