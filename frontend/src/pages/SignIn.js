import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function LogOut()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passType, setPassType] = useState('password');
    const [EyeIcon, setEyeIcon] = useState(faEyeSlash);
    const [error, setError] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const validateForm = () =>
    {
        const newErrors = { email: '', password: '' };
        if (!email)
        {
            newErrors.email = 'Please fill your email';
        }
        if (!password)
        {
            newErrors.password = 'Please fill your password';
        }

        setError(newErrors);

        return Object.values(newErrors).every((error) => !error);
    }
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
        if (validateForm())
        {
            const reqGetUser = {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            };
            try
            {
                let result = await fetch('http://localhost:9000/signin', reqGetUser);
                result = await result.json();
                if (result.error === "user not found")
                {
                    setError({ ...error, email: result.error });
                    console.log(result.error)
                } else if (result.error === "password Mismatch")
                {
                    setError({ ...error, password: result.error });
                }
                else
                {
                    if (result.email)
                    {
                        localStorage.setItem('user', JSON.stringify(result));
                        navigate('/')
                    }

                }

            } catch (error)
            {
                console.error('Error during signup:', error);
            }
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
                        {error.email && <div className="invalid-feedback">
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {error.email}
                        </div>}
                    </div>
                    <div className="col-md-12 mb-3 position-relative">
                        <input type={passType} className="form-control" id="setPassword" placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                        <span className='eyeIcon'><FontAwesomeIcon icon={EyeIcon} onClick={() => changeInpType()} /></span>
                        {error.password && <div className="invalid-feedback">
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {error.password}
                        </div>}
                    </div>
                    <div className="col-md-12 mb-3">
                        <button className='submit-btn'>Sign In</button>
                    </div>
                    <div className='col-md-12 mb-1'><p className='acc_switch'>No account? <Link to='/signup'>Create one!</Link></p></div>
                    <div className='col-md-12 mb-1'><p className='acc_switch'>Forget password? <Link to='/forget-password'>Change!</Link></p></div>
                </div>
            </div>
        </form>
    )
}

export default LogOut