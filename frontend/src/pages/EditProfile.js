import React, { useState, useRef } from 'react'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import AlertSuccess from '../components/AlertSuccess';

const EditProfile = () =>
{
    //const [value, onChange] = useState(); // State for DatePicker value
    const [profile, setProf] = useState('');
    const [profImage, setprofImage] = useState('images/profile.jpg');
    const [address, setAddress] = useState('');
    const [fullName, setfullName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [alert, setAlert] = useState(false);
    const fileInputRef = useRef(null);
    const handleDob = (e) =>
    {
        let date = e.toDateString('en-GB');
        setDob(date)
    }
    const handleClick = () =>
    {
        fileInputRef.current.click();
    };
    const handleFileChange = () =>
    {
        const selectedFile = fileInputRef.current.files[0];
        const fileName = selectedFile ? selectedFile.name : '';
        setProf(fileName);
        const render = new FileReader();
        render.onload = (e) =>
        {
            setprofImage(e.target.result);
        }
        if (selectedFile)
        {
            render.readAsDataURL(selectedFile);
        }
    };
    const updateProf = async (e) =>
    {
        e.preventDefault();

    }
    return (
        <>
            <form className='signup_form' onSubmit={updateProf} 6="multipart/form-data">
                <div className='inp-wrap'>
                    <div className="row gx-2">
                        <div className="col-md-12 mb-4">
                            <h2 className='title'>Update your profile deails</h2>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <div className='profile-pic'>
                                <div className='pic'>
                                    <input type='file' className='invisible position-absolute' name={profile} ref={fileInputRef} onChange={() => handleFileChange()} style={{ zIndex: -1, width: '0px', height: '0px' }} />
                                    <img src={profImage} alt='' />
                                    <span className='update-prof-btn' onClick={() => handleClick()}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <input type="text" className="form-control" placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" className="form-control" placeholder='Full name' onChange={(e) => { setfullName(e.target.value) }} value={fullName} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input type="text" className="form-control" placeholder='Occupation' onChange={(e) => { setOccupation(e.target.value) }} value={occupation} />
                        </div>
                        <div className="col-md-6 mb-3 position-relative">
                            <input type='number' className="form-control" placeholder='Age' onChange={(e) => { setAge(e.target.value) }} value={age} />
                        </div>
                        <div className="col-md-6 mb-3 position-relative">
                            <DatePicker onChange={handleDob} value={dob} format="dd-MM-y" clearIcon={null} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <select className="form-select" aria-label="Default select example" onChange={(e) => { setGender(e.target.value) }} value={gender}>
                                <option value='' disabled>Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Others'>Others</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3 position-relative">
                            <input type='number' className="form-control" placeholder='Phone number' onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                        </div>
                        <div className="col-md-12 mb-3">
                            <button className='submit-btn'>Update</button>
                        </div>
                    </div>
                </div>
            </form>
            {(alert) ? <AlertSuccess /> : null}
        </>
    )
}

export default EditProfile