import React, { useState } from 'react';

const Login = ({ hide, setStatus }) => {
  const initialFormState = {
    username:"",
    password:""
  };
  
  const [ form, setForm ] = useState(initialFormState);
  const handleOnChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const verifyUser = async (payload) => {

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


  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (!form.username || !form.password) return alert("Enter all fields below!");
      verifyUser(form);
      setForm(initialFormState);
      hide();
    }}>

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
    <input type="submit" value="Login" />
  </form>
  )
}

export default Login;