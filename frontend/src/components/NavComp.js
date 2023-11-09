import { faArrowRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserDropdown from './UserDropdown';
import { Link, useLocation } from 'react-router-dom';

function NavComp()
{
  const auth = localStorage.getItem('user');
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to='/'>E-COMMERCE</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {auth ?
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/add'>Add Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/update'>Update Products</Link>
              </li>
              <UserDropdown />
            </ul>
            : <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {(location.pathname === '/signup') ? <Link className="nav-link" to='/signin'>Sign In <span><FontAwesomeIcon icon={faArrowRightToBracket} /></span></Link>
                  : <Link className="nav-link" to='/signup'>Sign Up <span><FontAwesomeIcon icon={faUserPlus} /></span></Link>}
              </li>
            </ul>}
        </div>
      </div>
    </nav>
  );
}

export default NavComp;
