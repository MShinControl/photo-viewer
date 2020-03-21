/**
 * ************************************
 *
 * @module AuthComponent
 * @description Parent Component for both Login & Registration Modals
 *
 * ************************************
 */

import React, { useState } from "react";
import RegisterModal from './Modal/RegisterModal';
import LoginModal from './Modal/LoginModal';
import useModal from '../customHooks/useModal'; // Import custom hook.

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
        <img className="logo" src="./client/styles/assets/camera-retro-solid.svg"></img>
        <div className="auth-ctn">
          <button className="login-auth-btn" onClick={() => handleOnClick('login')}>Login</button>
          <button className="register-auth-btn" onClick={() => handleOnClick('register')}>Register</button>
        </div>
      </nav>

      <div className="title-ctn">
        <h1 className="title">Welcome to the Gallery.</h1>
        <h2 className="sub-title">Hope you like what you see.</h2>
      </div>
    </div>
  )
}

export default AuthComponent;