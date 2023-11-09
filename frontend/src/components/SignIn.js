import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function LogOut()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passType, setPassType] = useState('password');
    const [EyeIcon, setEyeIcon] = useState(faEyeSlash);
    const navigate = useNavigate();
    const changeInpType = () =>
    {
        if (passType === 'password')
        {
            setPassType('text');
            setEyeIcon(faEye)
        } else
        {
            setPassType('password')
            setEyeIcon(faEyeSlash)
        }
    }
    const fetchUserData = async (e) =>
    {
        e.preventDefault();
        const reqGetUser = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        let result = await fetch('http://localhost:9000/signin', reqGetUser);
        result = await result.json();
        if (result.email)
        {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/')
        }
    }
    return (
        <form className='signup_form' onSubmit={fetchUserData}>
            <div className='inp-wrap'>
                <div className="row gx-2">
                    <div className="col-md-12 mb-4">
                        <h2 className='title'>Sign In</h2>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="email" className="form-control" id="setEmail" placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                        <div className="invalid-feedback">
                            <FontAwesomeIcon icon={faTriangleExclamation} />  Required
                        </div>
                    </div>
                    <div className="col-md-12 mb-3 position-relative">
                        <input type={passType} className="form-control" id="setPassword" placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                        <span className='eyeIcon'><FontAwesomeIcon icon={EyeIcon} onClick={() => changeInpType()} /></span>
                        <div className="invalid-feedback">
                            <FontAwesomeIcon icon={faTriangleExclamation} />  Required
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <button className='submit-btn'>Sign In</button>
                    </div>
                    <div className='col-md-12 mb-1'><p className='acc_switch'>No account? <Link to='/signup'>Create one!</Link></p></div>
                </div>
            </div>
        </form>
    )
}

export default LogOut