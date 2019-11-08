import React, { useState } from 'react';
import Login from '../Login';
import Camera from '../Camera';
import QRScan from '../QRScan';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function App() {
  const [state, setState] = useState({ 
    loginInfo: null, 
    //Test info es idAssay-idExperiment
    testInfo: null
  });

  const login = (loginData) => {
    setState({
      ...state,
      loginInfo: loginData
    })
  }

  const setTestInfo = (testInfo) => {
    console.log("Setting test info: ",testInfo)
    setState({
      ...state,
      testInfo: testInfo
    })
  }
  
  return (
    <Router>
      {
        !state.loginInfo && 
        <Redirect from="/" to="/login" />
      }

      <Route 
        path="/qr-scan" 
        exact 
        render={(props) => (<QRScan {...props} setTestInfo={setTestInfo} />)}
      />

      <Route 
        path="/camera" 
        exact 
        render={(props) => (<Camera {...props} testInfo={state.testInfo} />)}
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