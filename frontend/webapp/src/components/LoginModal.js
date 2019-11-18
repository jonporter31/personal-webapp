import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DjangoCSRFToken from 'django-react-csrftoken';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import {
  doLogin,
  doLogout,
  setAccountName,
  setLogout,
  setLoginError,
  setWaitingForAuth,
  setAnon,
  setToken,

  loginModalShow,
  loginModalHide,
  contactModalShow,
  contactModalHide,
  changePageState
} from '../actions/actionCreators';



/*import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';*/

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#ffc107',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffc107',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffc107',
      },
      '&:hover fieldset': {
        borderColor: '#ffc107',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffc107',
      },
    },
  },
})(TextField);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    spacing: 1,
  },
});

const mapStateToProps = state => {
  return {
  Account: state.Account,
  Main: state.Main
  }
}

const mapDispatchToProps = dispatch => ({
  doLogin: () => dispatch(doLogin()),
  doLogout: () => dispatch(doLogout()),
  setAccountName: (name) => dispatch(setAccountName(name)),
  setLoginError: (error) => dispatch(setLoginError(error)),
  setWaitingForAuth: (error) => dispatch(setWaitingForAuth(error)),
  setAnon: (error) => dispatch(setAnon(error)),
  setToken: (token) => dispatch(setToken(token)),

  loginModalShow: () => dispatch(loginModalShow()),
  loginModalHide: () => dispatch(loginModalHide()),
  contactModalShow: () => dispatch(contactModalShow()),
  contactModalHide: () => dispatch(contactModalHide()),
  changePageState: (state) => dispatch(changePageState(state)),
})

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.renderLoginHeader = this.renderLoginHeader.bind(this)
    this.renderLoginLoader = this.renderLoginLoader.bind(this)
    this.processLoginResponse = this.processLoginResponse.bind(this)
    this.processNameResponse = this.processNameResponse.bind(this)
    //this.doInitialLoad = this.doInitialLoad.bind(this)
    this.getAnimal = this.getAnimal.bind(this)
    this.keyPress = this.keyPress.bind(this)
    this.state = {
      userValue: '',
      passValue: ''
    }
  }

  handleUserChange(event) {
    this.setState({userValue: event.target.value})
  }

  handlePassChange(event) {
    this.setState({passValue: event.target.value})
  }

  processNameResponse(response) {
    if (response.error_code == '0') {
      var payload = JSON.parse(response.payload)
      if (payload.anon) {
        this.props.doLogout()
      } else {
        this.props.setAccountName(payload.name)
        
      }
    }
  }

  getAnimal() {
    var animalArray = ['corgi','anteater','capybara','chinchilla','chupacabra','dingo','dinosaur','gopher','hedgehog','iguana','jackal','kangaroo','koala','kraken','lemur','liger','llama','manatee','mink','narwhal','orangutan','panda','penguin','platypus','pumpkin','python','raccoon','shrew','squirrel','turtle','walrus','wombat'];

    var randomAnimal = animalArray[Math.floor(Math.random() * animalArray.length)];

    return (randomAnimal);

  }

/*  doInitialLoad(response) {
    if (response.error_code == '0') {
      var payload = JSON.parse(response.payload)
      if (payload.anon) {
        this.props.doLogout()
        this.props.setAccountName('anonymous '+this.getAnimal())
        this.props.appSettingsButtonHide()
        this.props.appSourcesButtonHide()
        this.props.appUserButtonHide()
        this.props.appSelectorButtonsHide()
      } else {
        this.props.setConfigFromServer(payload.currentConfig)
        this.props.setDisplayConfig(payload.displayConfig)
      }
    }
    
  }*/

  

  processLoginResponse(response) {
    if (response.hasOwnProperty('token')) {
      this.props.doLogin()
      var username = this.state.userValue
      this.setState({userValue:'',passValue:''})
      this.props.setAnon(false)
      this.props.setToken(response.token)
      this.props.loginModalHide()
      this.props.setWaitingForAuth(false)
      this.props.setLoginError(false)

      var data = {
        source: 'react',
        error_code: '0',
        error_msg: '--none--',
        msg_reason: 'auth',
        payload: {
          action: 'get_account_name',
          subaction: '',
          included_data: {
            username:username
          }
        }
      }

      //var url = 'http://localhost:8000/api/post/'
      var url = 'http://backend.jporter.io/api/post/'

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
              'Authorization': 'Token '+this.props.Account.token
          },
        credentials: 'include'
      }).then(response => response.json())
      .then(response => this.processNameResponse(response))
      .catch(error => console.error('Error: ', error));




/*      var data = {
        source: 'react',
        error_code: '0',
        error_msg: '--none--',
        msg_reason: 'initial_load',
        payload: {
          action: 'initial_load',
          subaction: '',
          included_data: ''
        }
      }

      var url = 'http://localhost:8000/api/post/'

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
              'Authorization': 'Token '+this.props.Account.token
          },
        credentials: 'include'
      }).then(response => response.json())
      .then(response => this.doInitialLoad(response))
      .catch(error => console.error('Error: ', error));*/


    

    } else {
      this.props.setWaitingForAuth(false)
      this.props.setLoginError(true)
      this.props.setAnon(true)
      this.setState({passValue:''})
    }
  }

  keyPress(e){
    if(e.keyCode == 13){
      //console.log('enter pressed')
      this.handleLogin()
    }
  }

  handleLogin() {
    this.props.setWaitingForAuth(true)
    var data = {
      username: this.state.userValue,
      password: this.state.passValue
    }

    //var url = 'http://localhost:8000/api/auth/'
    var url = 'http://backend.jporter.io/api/auth/'

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
        },
      credentials: 'include'
    }).then(response => response.json())
    .then(response => this.processLoginResponse(response))
    .catch(error => console.error('Error: ', error));
  }

  handleCancel() {
    this.props.loginModalHide()
    this.props.setLoginError(false)
    this.setState({userValue:'',passValue:''})
  }

  renderLoginHeader() {
    if (this.props.Account.loginError) {
      return (<DialogContentText style={{ color:'red' }}>invalid username/password combination</DialogContentText>);
    } else {
      return(<DialogContentText>please enter your username and password</DialogContentText>);
    }
  }

  renderLoginLoader() {
    if (this.props.Account.waitingForAuth) {
      return (
        <div className="LoginLoader">
          <Grid container spacing={0}>
            <Grid item>
              <CircularProgress style={{ color: "#ffc107" }}/>
            </Grid>
            <Grid item>
              <Box m={0.5} />
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div align="center">
          <Grid container spacing={0}>
            <Grid item>
              <Button onClick={this.handleLogin} style={{ color: "#ffc107" , backgroundColor: '#333' }} variant="contained">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Box m={0.5} />
            </Grid>
            <Grid item>
              <Button onClick={this.handleCancel} style={{ color: "#ffc107" , backgroundColor: '#333' }} variant="contained">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    }
  }

  render () {
    const { classes } = this.props;

    if (this.props.Main.loginModalShow) {
      return (
        <div className="NewLoginModal">
          <form className={classes.root} onSubmit={this.handleLogin}>
            <DjangoCSRFToken/>
            <Dialog open={this.props.Main.loginModalShow} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">client login</DialogTitle>
              <DialogContent>
                {this.renderLoginHeader()}
                <CssTextField
                  autoFocus
                  id="user"
                  label="username"
                  className={classes.margin}
                  type="text"
                  value={this.state.userValue} 
                  onKeyDown={this.keyPress} 
                  onChange={this.handleUserChange} 
                  variant="outlined"
                  //variant="filled"
                  placeholder="enter username..."
                  //style={{ backgroundColor: "#ffc107", color: "#333" }}
                  inputProps={{
                    maxLength: 25,
                    style: { color: "#333" }
                  }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CssTextField
                  id="password"
                  label="password"
                  className={classes.margin}
                  type="password"
                  value={this.state.passValue} 
                  onKeyDown={this.keyPress} 
                  onChange={this.handlePassChange} 
                  variant="outlined"
                  //variant="filled"
                  placeholder="enter password..."
                  //style={{ backgroundColor: "#ffc107", color: "#333" }}
                  inputProps={{
                    maxLength: 25,
                    style: { color: "#333" }
                  }}
                />
              </DialogContent>
              <DialogActions>
                {this.renderLoginLoader()}
              </DialogActions>
            </Dialog>
          </form>
        </div>
      );
    } else {
      return (
      <div className="LoginModalHidden">
      </div>
    );
    }
  }
}


LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginModal));