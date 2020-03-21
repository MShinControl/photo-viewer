import React, { useState } from "react";
import RegisterModal from './Modal/RegisterModal';
import LoginModal from './Modal/LoginModal';
import useModal from '../customHooks/useModal';

const AuthComponent = ({ setStatus }) => {
  const { isShowing, toggle } = useModal();
  const [ active, setActive ] = useState('');
  
  const handleOnClick = (value) => {
    toggle();
    setActive(value)
  }

  console.log(active)

  return (
    <div className="homepage">
      {
        active === 'register' ? <RegisterModal setStatus={setStatus} isShowing={isShowing} hide={toggle}/> :
        active === 'login' ? <LoginModal setStatus={setStatus} isShowing={isShowing} hide={toggle}/> :
        null
      }

      <nav>
        <button className="login-auth-btn" onClick={() => handleOnClick('login')}>Login</button>
        <button className="register-auth-btn" onClick={() => handleOnClick('register')}>Register</button>
      </nav>

      <div className="title-ctn">
        <h1 class="title">Welcome to the Gallery.</h1>
        <h2 class="sub-title">Hope you like what you see.</h2>
      </div>
    </div>
  )
}

export default AuthComponent;