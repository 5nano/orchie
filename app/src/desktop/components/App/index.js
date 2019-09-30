import React, { useState } from 'react';
import Login from '../Login';
import CreateQR from '../CreateQR';
import './App.scss';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function App() {
  const [state, setState] = useState({ loginInfo: null });

  const login = (loginData) => {
    setState({
      loginInfo: loginData
    })
  }
  
  return (
    <Router>
      {
        !state.loginInfo && 
        <Redirect from="/" to="/login" />
      }

      <Route 
        path="/create-qr" 
        exact 
        render={(props) => (<CreateQR {...props} />)}
      />

      <Route 
        path="/login" 
        exact 
        render={(props) => <Login {...props} login={login} />}
      />
    </Router>
  );
}

export default App;
