import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const muiTheme = createMuiTheme({
  drawer: {
    zIndex: 1000,
  },
  appBar: {
  	zIndex: 2000,
  },
  overrides: {
    MuiDrawer: {
      paper: {
      	zIndex:1000,
      	position: "relative"
      },
    },
  }
});

ReactDOM.render(
	<ThemeProvider theme={muiTheme}>
		<Provider store={configureStore()}>
	  		<App />
	 	</Provider>
	</ThemeProvider>
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
