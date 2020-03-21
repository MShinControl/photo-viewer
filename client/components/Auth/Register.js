/**
 * ************************************
 *
 * @module Register
 * @description Sends user information to /register endpoint for adding using to database.
 *              Also renders all Forms & inputs and assigns the values to state.
 *
 * ************************************
 */

import React, { useState } from 'react';

const Register = ({ hide, setStatus }) => {
  const initialFormState = {
    firstName:"",
    lastName:"",
    username:"",
    password:""
  };
  
  const [ form, setForm ] = useState(initialFormState);

  const saveUser = async (payload) => {

    try {
      const serverRes = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      const { loggedIn } = await serverRes.json()
      setStatus(loggedIn);
      localStorage.setItem('status', loggedIn);
    } catch (error) {
      error ? console.log(error) : null;
    }
  }

  const handleOnChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className="register-modal" onSubmit={(event) => {
        event.preventDefault();
        if (!form.firstName || !form.lastName || !form.username || !form.password) return alert("Enter all fields below!");
        saveUser(form);
        setForm(initialFormState);
        hide();
      }}>

      <label>First Name <span className="required">*</span></label>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleOnChange}
      />
      <label>Last Name <span className="required">*</span></label>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleOnChange}
      />
      <label>Username <span className="required">*</span></label>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleOnChange}
      />
      <label>Password <span className="required">*</span></label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleOnChange}
      />
       <input className="submit-btn" type="submit" value="Create Account" />
    </form>
  )
}

export default Register;