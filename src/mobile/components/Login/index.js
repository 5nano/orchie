import React, { useState } from 'react';
import logo from '../../../assets/images/nanivo-logo.png';
import BushService from '../../../services/bush';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MySnackbarContentWrapper from '../Feedback/MySnackbarContentWrapper';
Login.propTypes = {
  validateLogin: PropTypes.func
}

function Login(props) {
  const [loginInfo, updateLoginInfo] = useState({ username: '', password: '' });
  const [open,setOpen] = React.useState(false);
  const [loading,setLoading] = React.useState(false);

  const openErrorFeedback= () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const login = (e) => {
    e.preventDefault();
    setLoading(true)
    BushService.post('/login',loginInfo)
                .then(response => {
                  document.cookie = `user=${loginInfo.username};max-age=${60*60*24*365}`
                  props.validateLogin();
                  props.history.push('qr-scan')
                  setLoading(false)
                })
                .catch(error => {
                  openErrorFeedback()
                  setLoading(false)
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
            placeholder="Contraseña" onChange={(e) => updateLoginInfo({ password: e.target.value, username: loginInfo.username })}
            value={loginInfo.password} />
            <button className="login-button" onClick={login} disabled={loading}>
              {loading? 'Verificando...' : 'Ingresar'}
            </button>
          </div>
        </div>
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="error"
              message="El usuario y/o la contraseña son incorrectos"
              />
          </Snackbar>
    </div>
  );
}

export default Login;
