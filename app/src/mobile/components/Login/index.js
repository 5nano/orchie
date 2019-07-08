import React, { useState } from 'react';
import logo from './logo.png';
import './Login.scss';
import axios from 'axios';

function Login(props) {
  const [loginInfo, updateLoginInfo] = useState({ username: '', pw: '' });

  const login = (e) => {
    e.preventDefault();
    axios.post('/api/login', loginInfo)
      .then(() => {
        props.login(loginInfo);
        
       //props.history.replace('/steps-print-plane');
       props.history.replace('image-router');
      })
      .catch(console.log)
  }
  
  return (
    <div className="Login">
    <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <h1 className="title">5nano</h1>
        <p>
        Login into your account
        </p>
        <input 
        placeholder="User" 
        onChange={(e => updateLoginInfo({ username: e.target.value, pw: loginInfo.pw }))}
        value={loginInfo.username} />
        <input 
        type="password"
        placeholder="Password" onChange={(e => updateLoginInfo({ pw: e.target.value, username: loginInfo.username }))}
        value={loginInfo.pw} />
        <input type="submit" onClick={login} />
    </header>
    </div>
  );
}

export default Login;
