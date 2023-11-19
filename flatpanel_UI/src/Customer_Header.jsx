import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsJustify}
 from 'react-icons/bs'
 import PropTypes from 'prop-types';
 import {AiFillHome} from 'react-icons/ai' 
import { Link } from 'react-router-dom';


function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar} />
        </div>
        <Link to="/" className='header-left'>
            <AiFillHome className='icon' />
        </Link>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired, 
};


export default Header