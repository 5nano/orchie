import React, { useState } from 'react';
import Login from '../Login';
import Camera from '../Camera';
import QRScan from '../QRScan';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import PrivateRoute from '../Utilities/PrivateRoute/PrivateRoute';

function App() {

  const [{logged: loggedIn}, setLogin] = React.useState({logged: false});
    const validateLogin = () => {
        if (document.cookie.includes('user') && !loggedIn)
            setLogin({logged: true});
    };
    validateLogin();
  
  return (
    <Router>
      {
        !loggedIn && 
        <Redirect to="/login" />
      }
      
      <Route 
        path="/login" 
        exact 
        render={(props) => loggedIn? <Redirect to="/qr-scan" />: <Login {...props} validateLogin={validateLogin} />}
      />

      <PrivateRoute 
        path='/qr-scan'
        exact
        component={QRScan}
        isLoggedIn={loggedIn}
        />

      <PrivateRoute 
        path='/camera'
        exact
        component={Camera}
        isLoggedIn={loggedIn}
        />

    </Router>
  );
}

export default App;
