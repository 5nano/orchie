import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../../assets/images/nanivo-logo.png';

function Login(props) {
  const [loginInfo, updateLoginInfo] = useState({ username: '', pw: '' });

  const login = (e) => {
    e.preventDefault();
    axios.post('/api/login', loginInfo)
      .then(() => {
        props.login(loginInfo);
        
       props.history.replace('/qr-scan');
       
      })
      .catch(console.log)
  }
  
  return (
    <div className="Login">

        <div className="logo">
          <img src={logo}/>
        </div>
        
        <div className="login-form-container">
          <div className="login-wrapper">
            <input 
            placeholder="Usuario" 
            onChange={(e => updateLoginInfo({ username: e.target.value, pw: loginInfo.pw }))}
            value={loginInfo.username} />
            <input 
            type="password"
            placeholder="Contraseña" onChange={(e => updateLoginInfo({ pw: e.target.value, username: loginInfo.username }))}
            value={loginInfo.pw} />
            <button className="login-button" onClick={login}>
              Ingresar
            </button>
          </div>
        </div>
    </div>
  );
}

export default Login;
