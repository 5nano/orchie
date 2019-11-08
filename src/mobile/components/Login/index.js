import React, { useState } from 'react';
import logo from '../../../assets/images/nanivo-logo.png';
import BushService from '../../../services/bush';
import PropTypes from 'prop-types';

Login.propTypes = {
  validateLogin: PropTypes.func
}

function Login(props) {
  const [loginInfo, updateLoginInfo] = useState({ username: '', password: '' });

  const login = (e) => {
    e.preventDefault();


    BushService.post('/login',loginInfo)
                .then(response => {
                  document.cookie = `user=${loginInfo.username};max-age=${60*60*24*365}`
                  props.validateLogin();
                  props.history.push('qr-scan')
                })
                .catch(error => {
                  console.log("error")
                  
                })

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
            onChange={(e => updateLoginInfo({ username: e.target.value, password: loginInfo.password }))}
            value={loginInfo.username} />
            <input 
            type="password"
            placeholder="Contraseña" onChange={(e => updateLoginInfo({ password: e.target.value, username: loginInfo.username }))}
            value={loginInfo.password} />
            <button className="login-button" onClick={login}>
              Ingresar
            </button>
          </div>
        </div>
    </div>
  );
}

export default Login;
