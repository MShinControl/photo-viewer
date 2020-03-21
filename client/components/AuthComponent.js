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
    <div>
        <button onClick={() => handleOnClick('login')}>Login</button>
        <button onClick={() => handleOnClick('register')}>Register</button>
        {active === 'register' ? <RegisterModal setStatus={setStatus} isShowing={isShowing} hide={toggle}/> :
         active === 'login' ? <LoginModal setStatus={setStatus} isShowing={isShowing} hide={toggle}/> :
         null}
    </div>
  )
}

export default AuthComponent;