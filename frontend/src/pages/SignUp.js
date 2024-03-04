import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
function SignUp()
{
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passType, setPassType] = useState('password');
  const [EyeIcon, setEyeIcon] = useState(faEyeSlash);
  //const inputRef = useRef(null);
  const [error, setError] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const validateForm = () =>
  {
    const newErrors = { fname: '', lname: '', email: '', password: '', cpassword: '' };

    if (!fname)
    {
      newErrors.fname = 'Please fill your first name';
    }
    if (!lname)
    {
      newErrors.lname = 'Please fill your last name';
    }
    if (!email)
    {
      newErrors.email = 'Please fill your email';
    }
    if (!password)
    {
      newErrors.password = 'Please fill your password';
    }
    if (password.length < 8)
    {
      newErrors.password = 'Password should be minimum 8 characters';
    }
    if (password.length > 16)
    {
      newErrors.password = 'Password should be maximum 16 characters';
    }
    if (!cpassword)
    {
      newErrors.cpassword = 'Please fill your confirm password';
    }
    if (cpassword !== password)
    {
      newErrors.cpassword = 'Password is not matching';
    }

    setError(newErrors);

    return Object.values(newErrors).every((error) => !error);
  }

  // const passValid = () =>
  // {

  // }
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
  useEffect(() =>
  {
    const auth = localStorage.getItem('user');
    if (auth)
    {
      navigate('/')
    }
  });

  const submitData = async (e) =>
  {
    e.preventDefault();
    if (validateForm())
    {
      const reqOpt = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          email: email,
          password: password
        })
      };
      try
      {
        let result = await fetch("http://localhost:9000/signup", reqOpt);
        result = await result.json();
        if (result.error)
        {
          setError({ ...error, email: result.error });
        } else
        {
          localStorage.setItem('user', JSON.stringify(result));
          if (result)
          {
            navigate('/')
          }
        }
      }
      catch (error)
      {
        console.error('Error during signup:', error);
      }
    }
  }
  return (
    <form className='signup_form' onSubmit={submitData}>
      <div className='inp-wrap'>
        <div className="row gx-2">
          <div className="col-md-12 mb-4">
            <h2 className='title'>Sign Up</h2>
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" className="form-control" id="setFName" placeholder='First Name'
              onChange={(e) => setFName(e.target.value)} value={fname} />
            {error.fname && <div className="invalid-feedback">
              <FontAwesomeIcon icon={faTriangleExclamation} /> {error.fname}
            </div>}
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" className="form-control" id="setLName" placeholder='Last Name'
              onChange={(e) => setLName(e.target.value)} value={lname} />
            {error.lname && <div className="invalid-feedback">
              <FontAwesomeIcon icon={faTriangleExclamation} /> {error.lname}
            </div>}
          </div>
          <div className="col-md-12 mb-3">
            <input type="email" className="form-control" id="setEmail" placeholder='Email'
              onChange={(e) => setEmail(e.target.value)} value={email} />
            {error.email && <div className="invalid-feedback">
              <FontAwesomeIcon icon={faTriangleExclamation} /> {error.email}
            </div>}
          </div>
          <div className="col-md-6 mb-3 position-relative">
            <input type={passType} className="form-control" id="setPassword" placeholder='Password'
              onChange={(e) => setPassword(e.target.value)} value={password} />
            <span className='eyeIcon'><FontAwesomeIcon icon={EyeIcon} onClick={() => changeInpType()} /></span>
            {error.password && <div className="invalid-feedback">
              <FontAwesomeIcon icon={faTriangleExclamation} /> {error.password}
            </div>}
          </div>
          <div className="col-md-6 mb-3">
            <input type="password" className="form-control" id="setCPassword" placeholder='Confirm Password'
              onChange={(e) => setCPassword(e.target.value)} value={cpassword} />
            {error.cpassword && <div className="invalid-feedback">
              <FontAwesomeIcon icon={faTriangleExclamation} /> {error.cpassword}
            </div>}
          </div>
          <div className="col-md-12 mb-3">
            <button className='submit-btn'>Sign Up</button>
          </div>
          <div className='col-md-12 mb-1'><p className='acc_switch'>Already have an account? <Link to='/signin'>Sign In!</Link></p></div>
        </div>
      </div>
    </form>
  )
}

export default SignUp;