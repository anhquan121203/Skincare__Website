import React from 'react'
import "./Login.css";
import logo from "../../../assets/images/logo.png"
import iconGG from "../../../assets/login/iconGG.png"
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className='login-container'>

      <div className='login-left'>
        <div className='login-logo'>
          <img src={logo} alt='logo page' />
        </div>

        <p style={{color: "white"}}>
          Your skin is your bodys largest organ, and it deserves all the care
          and love you can give.
        </p>
        <Link >
          <Button>Sign Up</Button>
        </Link>
      </div>

      {/* LOGIN RIGHT***************** */}
      <div className='login-right'>
        <h2>Đăng nhập</h2>
        <form>
          <div className='form-group'>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder='Enter your email...'
              required
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder='**********'
              required
            />
          </div>

          <div className='form-options'>
            <label>
              <input type="checkbox" />
              Keep me login!!!
            </label>
            <Link>Forgot password</Link>
          </div>
          <button
            type='submit'
            className='login-button'

          />
        </form>

        <p style={{ marginBottom: "-5px" }}>Or login with google</p>
        <div className='social-login'>
          <button className="google">
            <img src={iconGG} alt="" />
          </button>
        </div>

        <p>
          Don't have an account? <a href="">Register</a>
        </p>

      </div>

    </div>
  )
}

export default LoginPage;