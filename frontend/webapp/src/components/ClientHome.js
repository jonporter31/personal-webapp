import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ErrorSharpIcon from '@material-ui/icons/ErrorSharp';
import ReplaySharpIcon from '@material-ui/icons/ReplaySharp';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  changePageState
} from '../actions/actionCreators';


const mapStateToProps = state => {
  return {
    Main: state.Main,
    Account: state.Account
  }
}


const mapDispatchToProps = dispatch => ({
  changePageState: (state) => dispatch(changePageState(state)),
})

const styles = theme => ({
  dashboardRoot: {
    display: 'flex',
    flexGrow: 1,
    zIndex: 10,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    spacing: 3,
  },
  toolbar: {
    minHeight: 64,
  },
    mainPaper: {
    position: "relative",
    verticalAlign: 'top',
    top: 10,
    left: 0,
    right:10,
    bottom:10,
  },
});

class ClientHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAlertButton:true
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboardRoot}>

      </div>
    );
  }

}

ClientHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClientHome));