import React, { useState } from 'react';
import Login from '../Login';
import PrintInstructions from '../PrintInstructions';
import PictureInstructions from '../PictureInstructions';
import Camera from '../Camera';
import QRScan from '../QRScan';
import './App.scss';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function App() {
  const [state, setState] = useState({ 
    loginInfo: null, 
    experiment: {experimentId: null, 
                 experimentName: '',
                 testId: null}
  });

  const login = (loginData) => {
    setState({
      ...state,
      loginInfo: loginData
    })
  }

  const setCurrentExperiment = (experimentId, experimentName, testId) => {
    setState({
      ...state,
      experiment: {experimentId,experimentName,testId}
    })
  }
  
  return (
    <Router>
      {
        !state.loginInfo && 
        <Redirect from="/" to="/login" />
      }

      <Route 
        path="/steps-print-plane" 
        exact 
        render={(props) => (<PrintInstructions {...props} />)}
      />

      <Route 
        path="/steps-use-plane" 
        exact 
        render={(props) => (<PictureInstructions {...props} />)}
      />


      <Route 
        path="/qr-scan" 
        exact 
        render={(props) => (<QRScan {...props} setCurrentExperiment={setCurrentExperiment} />)}
      />

      <Route 
        path="/camera" 
        exact 
        render={(props) => (<Camera {...props} currentExperiment = {state.experiment} />)}
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
