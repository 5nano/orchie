import React, { useState } from 'react';
import logo from './logo.png';
import './styles.scss';
import axios from 'axios';

function App() {
  const [loginInfo, updateLoginInfo] = useState({ username: '', pw: ''});
  const login = (e) => {
    console.log(e);
    e.preventDefault();
    axios.post('/api/login', { data: loginInfo});
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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

export default App;
