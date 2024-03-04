import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Profile = () =>
{
    return (
        <>
            <section className='sec-height pt-0'>
                <div className='profile-cover'>
                    <div className='container position-relative h-100'>
                        <div className='profile-pic'>
                            <div className='pic'>
                                <img src='images/profile.jpg' alt='' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='user-content'>
                        <div className='info-wrap'>
                            <div className='info'>
                                <h1 className='name'>Ravindra Kumar</h1>
                                <h2 className='address'>Sarita Vihar New Delhi - 110076</h2>
                                <ul>
                                    <li>Role : <span>Admin</span></li>
                                    <li>Department : <span>IT(software)</span></li>
                                    <li>Age : <span>24Y</span></li>
                                    <li>Gender : <span>Male</span></li>
                                    <li>DOB : <span>15/07/19198</span></li>
                                    <li>E-mail : <span>ravindrakumar@nextgenesolutions.com</span></li>
                                    <li>Mobile : <span>7007951024</span></li>
                                </ul>
                            </div>
                            <div className='update-info'>
                                <button> <FontAwesomeIcon icon={faEdit} /> Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile