import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import AccountInfo from './components/AccountInfo';
import LoginModal from './components/LoginModal';
import ContactModal from './components/ContactModal';
import AppCanvas from './components/AppCanvas';
import Toasts from './components/Toasts';
//import { BrowserView, MobileView } from "react-device-detect";

class App extends Component {
  

  render() {

    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <LoginModal />
          <ContactModal />
          <AccountInfo />
          <AppCanvas />
          <Toasts />
        </React.Fragment>

      </div>
    );
  }
}

export default App;

