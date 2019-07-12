import React, { useState } from 'react';
import Login from '../Login';
import PrintInstructions from '../PrintInstructions';
import PictureInstructions from '../PictureInstructions';
import Camera from '../Camera';
import QRScan from '../QRScan';
import ImageRouter from '../ImageRouter';
import './App.scss';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function App() {
  const [state, setState] = useState({ loginInfo: null, experimentName: '' });

  const login = (loginData) => {
    setState({
      ...state,
      loginInfo: loginData
    })
  }

  const setCurrentExperiment = (experimentName) => {
    setState({
      ...state,
      experimentName
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
        render={(props) => (<Camera {...props} currentExperiment={state.experimentName} />)}
      />

      <Route
        path="/image-router"
        exact
        render={(props) => (<ImageRouter />)}
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
