import React, { useState } from 'react';
import Login from '../Login';
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
        path="/" 
        exact 
        render={(props) => (<div> Yeah, logueaste </div>)}
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
