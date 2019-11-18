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
  changePageState,

  toastSetMsg
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

  toastSetMsg: (msg) => dispatch(toastSetMsg(msg)),
})

class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleJobChange = this.handleJobChange.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.renderContactHeader = this.renderContactHeader.bind(this)
    this.renderContactLoader = this.renderContactLoader.bind(this)
    this.processContactResponse = this.processContactResponse.bind(this)
    this.keyPress = this.keyPress.bind(this)
    this.state = {
      nameValue: '',
      emailValue: '',
      phoneValue: '',
      jobValue: '',
      commentValue: '',
      waitingForResp: false,
      errorMsg: false
    }
  }

  handleNameChange(event) {
    this.setState({nameValue: event.target.value})
  }

  handleEmailChange(event) {
    this.setState({emailValue: event.target.value})
  }

  handlePhoneChange(event) {
    this.setState({phoneValue: event.target.value})
  }

  handleJobChange(event) {
    this.setState({jobValue: event.target.value})
  }

  handleCommentChange(event) {
    this.setState({commentValue: event.target.value})
  }



  

  processContactResponse(response) {
    this.setState({ waitingForResp: false })
    if (response.error_code == '0') {
      var payload = JSON.parse(response.payload)
      if (payload.successful) {
        this.props.contactModalHide()
        this.setState({
          nameValue: '',
          emailValue: '',
          phoneValue: '',
          jobValue: '',
          commentValue: '',
          errorMsg: false
        })

        this.props.toastSetMsg('message sent! thank you for reaching out')

        } else {
          console.log('error submitting contact')
          this.setState({ errorMsg: payload.error_msg })
        }
    } else {
      console.log('error submitting contact - django returned error_code > 0')
    }
  }

  handleSubmit() {
    this.setState({ waitingForResp: true })

    var data = {
      source: 'react',
      error_code: '0',
      error_msg: '--none--',
      msg_reason: 'form_submit',
      payload: {
        action: 'contact_me',
        subaction: '',
        included_data: {
          name: this.state.nameValue,
          email: this.state.emailValue,
          phone: this.state.phoneValue,
          job: this.state.jobValue,
          comment: this.state.commentValue 
        }
      }
    }

    //var url = 'http://localhost:8000/api/post/anon/'
    var url = 'http://backend.jporter.io/api/post/anon/'

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        //'Authorization': 'Basic'
        },
      //credentials: 'include'
    }).then(response => response.json())
    .then(response => this.processContactResponse(response))
    .catch(error => console.error('Error: ', error));
  }

  keyPress(e){
    if(e.keyCode == 13){
      //console.log('enter pressed')
      this.handleSubmit()
    }
  }

  handleCancel() {
    this.props.contactModalHide()
    this.setState({
      nameValue: '',
      emailValue: '',
      phoneValue: '',
      jobValue: '',
      commentValue: '',
      waitingForResp: false,
      errorMsg: false
    })
  }

  handleReset() {
    this.setState({
      nameValue: '',
      emailValue: '',
      phoneValue: '',
      jobValue: '',
      commentValue: '',
      waitingForResp: false,
      errorMsg: false
    })
  }

  renderContactHeader() {
    if (this.state.errorMsg) {
      return (
        <div>
          <DialogContentText>please fill out the details below and i will reach out within 24 hours</DialogContentText>
          <DialogContentText style={{ color:'red' }}>error! {this.state.errorMsg}</DialogContentText>
        </div>
      );
    } else {
      return(<DialogContentText>please fill out the details below and i will reach out within 24 hours</DialogContentText>);
    }
  }

  renderContactLoader() {
    if (this.state.waitingForResp) {
      return (
        <div className="ContactLoader">
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
              <Button onClick={this.handleSubmit} style={{ color: "#ffc107" , backgroundColor: '#333' }} variant="contained">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Box m={0.5} />
            </Grid>
            <Grid item>
              <Button onClick={this.handleReset} style={{ color: "#ffc107" , backgroundColor: '#333' }} variant="contained">
                Reset
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

    if (this.props.Main.contactModalShow) {
      return (
        <div className="NewContactModal">
          <form className={classes.root} onSubmit={this.handleSubmit}>
            <DjangoCSRFToken/>
            <Dialog open={this.props.Main.contactModalShow} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">contact me</DialogTitle>
              <DialogContent>
                {this.renderContactHeader()}
                <CssTextField
                  //autoFocus
                  fullWidth
                  id="name"
                  label="your name*"
                  className={classes.margin}
                  type="text"
                  value={this.state.nameValue} 
                  onKeyDown={this.keyPress} 
                  onChange={this.handleNameChange} 
                  variant="outlined"
                  //variant="filled"
                  placeholder="john smith"
                  //style={{ backgroundColor: "#ffc107", color: "#333" }}
                  inputProps={{
                    maxLength: 100,
                    style: { color: "#333" }
                  }}
                />
                <Box m={0.5} p={0.5} />
                <CssTextField
                  fullWidth
                  id="email"
                  label="email*"
                  className={classes.margin}
                  type="email"
                  value={this.state.emailValue} 
                  onKeyDown={this.keyPress} 
                  onChange={this.handleEmailChange} 
                  variant="outlined"
                  //variant="filled"
                  placeholder="example@info.com"
                  //style={{ backgroundColor: "#ffc107", color: "#333" }}
                  inputProps={{
                    maxLength: 100,
                    style: { color: "#333" }
                  }}
                />
                <Box m={0.5} p={0.5} />
                <CssTextField
                  fullWidth
                  id="phone"
                  label="phone"
                  className={classes.margin}
                  type="tel"
                  value={this.state.phoneValue} 
                  onKeyDown={this.keyPress} 
                  onChange={this.handlePhoneChange} 
                  variant="outlined"
                  //variant="filled"
                  placeholder="(555) 555-5555 or 555-555-5555 or 5555555555"
                  //style={{ backgroundColor: "#ffc107", color: "#333" }}
                  inputProps={{
                    maxLength: 100,
                    style: { color: "#333" }
                  }}
                />
                <Box m={0.5} p={0.5} />
                <CssTextField
                  fullWidth
                  id="job"
                  label="what can i do for you?*"
                  className={classes.margin}
                  type="text"
                  multiline
                  rows="4"
                  value={this.state.jobValue} 
                  onKeyDown={this.keyPress} 
                  onChange={this.handleJobChange} 
                  variant="outlined"
                  //variant="filled"
                  placeholder="enter a few details about what you're interested in achieving together..."
                  //style={{ backgroundColor: "#ffc107", color: "#333" }}
                  inputProps={{
                    maxLength: 1000,
                    style: { color: "#333" }
                  }}
                />
                <Box m={0.5} p={0.5} />
                <CssTextField
                  fullWidth
                  id="comments"
                  label="additional comments"
                  className={classes.margin}
                  type="text"
                  multiline
                  rows="2"
                  value={this.state.commentValue} 
                  onKeyDown={this.keyPress} 
                  onChange={this.handleCommentChange} 
                  variant="outlined"
                  //variant="filled"
                  placeholder="any additional helpful details..."
                  //style={{ backgroundColor: "#ffc107", color: "#333" }}
                  inputProps={{
                    maxLength: 1000,
                    style: { color: "#333" }
                  }}
                />
              </DialogContent>
              <DialogActions>
                {this.renderContactLoader()}
              </DialogActions>
            </Dialog>
          </form>
        </div>
      );
    } else {
      return (
      <div className="ContactModalHidden">
      </div>
    );
    }
  }
}


ContactModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactModal));