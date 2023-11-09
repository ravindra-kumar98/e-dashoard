
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function UserDropdown()
{
    const navigate = useNavigate();

    const logOut = () =>
    {
        localStorage.clear();
        navigate('/signin');
    };

    return (
        <Dropdown className='nav-item'>
            <Dropdown.Toggle id="dropdown-basic" className='nav-link'>
                <FontAwesomeIcon icon={faUser} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Item href="#/signin" onClick={() => logOut()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserDropdown;