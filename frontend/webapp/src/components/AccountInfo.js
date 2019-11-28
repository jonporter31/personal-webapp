import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { isBrowser, isMobile } from "react-device-detect";

import {
  doLogin,
  doLogout,
  setAccountName,
  setLogout,
  loginModalShow,
  loginModalHide,
  contactModalShow,
  contactModalHide,
  changePageState
} from '../actions/actionCreators';


const mapStateToProps = state => {
  return {
    Main: state.Main,
    Account: state.Account
  }
}


const mapDispatchToProps = dispatch => ({
  doLogin: () => dispatch(doLogin()),
  doLogout: () => dispatch(doLogout()),
  setAccountName: (name) => dispatch(setAccountName(name)),
  setLogout: (name) => dispatch(setLogout(name)),
  loginModalShow: () => dispatch(loginModalShow()),
  loginModalHide: () => dispatch(loginModalHide()),
  contactModalShow: () => dispatch(contactModalShow()),
  contactModalHide: () => dispatch(contactModalHide()),
  changePageState: (state) => dispatch(changePageState(state)),
})



const styles = theme => ({
  accountInfoRoot: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#ffc107',
    },
  },
});

class AccountInfo extends Component {

  constructor(props) {
    super(props);
    //this.getAnimal = this.getAnimal.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.renderLoginButton = this.renderLoginButton.bind(this)
    this.renderLogoutButton = this.renderLogoutButton.bind(this)
    this.processLogoutResponse = this.processLogoutResponse.bind(this)
    this.renderContactButton = this.renderContactButton.bind(this)
    this.handleContactClick = this.handleContactClick.bind(this)
    this.renderDownloadButton = this.renderDownloadButton.bind(this)
    this.handleDownloadClick = this.handleDownloadClick.bind(this)
    this.processResponse = this.processResponse.bind(this)
    this.renderGithubButton = this.renderGithubButton.bind(this)
    this.state = {}
  }


  componentDidMount() {
    //this.props.setAccountName('anonymous '+this.getAnimal())

    var data = {
      source: 'react',
      error_code: '0',
      error_msg: '--none--',
      msg_reason: 'appbar_load',
      payload: {
        action: '',
        subaction: '',
        included_data: {
        }
      }
    }

    //var url = 'http://localhost:8000/api/post/anon/'
    var url = 'https://backend.jporter.io/api/post/anon/'

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        //'Authorization': 'Basic'
        },
      //credentials: 'include'
    }).then(response => response.json())
    .then(response => this.processResponse(response))
    .catch(error => console.error('Error: ', error));
  }

  processResponse(response) {
    if (response.error_code == '0') {
      console.log('details logged')
    } else {
      console.log('error logging details')
    }
  }
  
  /*getAnimal() {
    var animalArray = ['corgi','anteater','capybara','chinchilla','chupacabra','dingo','dinosaur','gopher','hedgehog','iguana','jackal','kangaroo','koala','kraken','lemur','liger','llama','manatee','mink','narwhal','orangutan','panda','penguin','platypus','pumpkin','python','raccoon','shrew','squirrel','turtle','walrus','wombat'];

    var randomAnimal = animalArray[Math.floor(Math.random() * animalArray.length)];

    return (randomAnimal);

  }*/

  handleLoginClick() {
    this.props.contactModalHide()
    this.props.loginModalShow()
  }

  handleContactClick() {
    this.props.loginModalHide()
    this.props.contactModalShow()
  }

  handleDownloadClick() {
    console.log('download triggered')
  }

  processLogoutResponse(response) {
    const emptyList = []
    if (response.error_code === '0') {
      var payload = JSON.parse(response.payload)
      if (payload.logout_successful) {
        this.props.doLogout()
        this.props.setAccountName('anonymous '+this.getAnimal())
        this.props.loginModalHide()
        this.props.changePageState('DEFAULT')

    } else {
      console.log('error logging out')
    }
  } else {
    console.log('error logging out')
  }
  }

  handleLogoutClick() {
    var data = {
    source: 'react',
    error_code: '0',
    error_msg: '--none--',
    msg_reason: 'auth',
    payload: {
      action: 'logout',
      subaction: '',
      included_data: {}
    }
  }

  //var url = 'http://localhost:8000/api/post/'
  var url = 'https://backend.jporter.io/api/post/'

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json',
          'Authorization': 'Token '+this.props.Account.token
      },
    credentials: 'include'
  }).then(response => response.json())
  .then(response => this.processLogoutResponse(response))
  .catch(error => console.error('Error: ', error));
  }



  renderLoginButton() {
    var buttonText = ""
    if (isMobile) {
      var buttonText = "Login"
    } else {
      var buttonText = "Client Login"
    }
    if (!this.props.Account.anon) {
      return (<div className="LoginButton"></div>);
    } else { 
      return (
        <Button color="inherit" text="Login" style={{ color: '#ffc107' }} onClick={this.handleLoginClick}>{buttonText}</Button>
      );
  }
  }

  renderLogoutButton() {
    if (this.props.Account.anon) {
      return (<div className="LogoutButton"></div>);
    } else { 
      return (
        <Button color="inherit" text="Logout" style={{ color: '#ffc107' }} onClick={this.handleLogoutClick}>Logout</Button>
      );
  }
  }

  renderContactButton() {
    var buttonText = ""
    if (isMobile) {
      var buttonText = "Hire"
    } else {
      var buttonText = "Hire Me"
    }
    return (
      <Button style={{ backgroundColor: '#ffc107' }} variant="contained" text="Contact" onClick={this.handleContactClick}>{buttonText}</Button>
    );
  }

  renderDownloadButton() {
    var buttonText = ""
    if (isMobile) {
      var buttonText = "Download"
    } else {
      var buttonText = "Download Resume"
    }
    return (
      <Button color="inherit" style={{ color: '#ffc107' }} text="Download" target="_blank" href="http://backend.jporter.io/download-resume/">{buttonText}</Button>
    );
  }

  renderGithubButton() {
    var buttonText = ""
    if (isMobile) {
      var buttonText = "Source"
    } else {
      var buttonText = "View Source"
    }
    return (
      <Button color="inherit" style={{ color: '#ffc107' }} text="Download" target="_blank" href="https://github.com/jonporter31/personal-webapp">{buttonText}</Button>
    );
  }

  renderName() {
    const { classes } = this.props;
    
    if (isBrowser) {
      if (this.props.Account.anon) {
        return (
          <Typography variant="h6" className={classes.title} style={{ color: '#ffc107' }}>
            welcome
          </Typography>
        );
      } else {
        return (
          <Typography variant="h6" className={classes.title} style={{ color: '#ffc107' }}>
            welcome, {this.props.Account.name}
          </Typography>
        );
      }
    } else {
      return(<span></span>);
    }
  }
  

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.accountInfoRoot}>
        <AppBar position="fixed" style={{ background: '#333333' }}>
          <Toolbar>
{/*            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon onClick={(e) => {this.handleMenuClick(e)}} />
              <Menu
                id="menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}
              >
                <MenuItem key="0" disabled="true">Available Dashboards</MenuItem>
                <Divider />
                {this.props.AppState.availableDashboards.map((dashboard) => (
                  <div>{this.renderMenuItem.call(this,dashboard)}</div>
                ))}
              </Menu>
            </IconButton>*/}
            {this.renderName()}
            <Box m={0.5} />
            {this.renderContactButton()}
            <Box m={1} />
            {this.renderDownloadButton()}
            <Box m={1} />
            {this.renderGithubButton()}
            <Box m={0.5} />
            {this.renderLoginButton()}
            {this.renderLogoutButton()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

AccountInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountInfo));