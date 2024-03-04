
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
                <Dropdown.Item onClick={(e) => { e.preventDefault(); navigate('/profile') }}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={(e) => { e.preventDefault(); logOut() }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserDropdown;