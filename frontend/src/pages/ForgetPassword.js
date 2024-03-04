import React from 'react'

const ForgetPassword = () =>
{
  return (
    <form className='signup_form'>
      <div className='inp-wrap'>
        <div className="row gx-2">
          <div className="col-md-12 mb-4">
            <h2 className='title'>Reset your password</h2>
          </div>
          <div className="col-md-12 mb-3">
            <input type="email" className="form-control" placeholder='Enter your email' />
          </div>
          <div className="col-md-12">
            <button className='submit-btn'>Sign Up</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ForgetPassword