import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import {
	toastHide,
	toastSetMsg
} from '../actions/actionCreators';


const mapStateToProps = state => {
  return {
    Main: state.Main
  }
}


const mapDispatchToProps = dispatch => ({
	toastSetMsg: (state) => dispatch(toastSetMsg(state)),
	toastHide: () => dispatch(toastHide()),
})



class AppCanvas extends Component {
	constructor(props) {
    	super(props);
    	this.handleClose = this.handleClose.bind(this)
	}

	handleClose() {
		this.props.toastHide()
	}

	render () {
		if (!this.props.Main.toastMsg) {
			return(<div className="ToastsHidden"></div>);
		} else {
			return (
				<div className="Toasts">
					<Snackbar
				        anchorOrigin={{
				          vertical: 'bottom',
				          horizontal: 'left',
				        }}
				        open={this.props.Main.toastMsg}
				        autoHideDuration={6000}
				        onClose={this.handleClose}
				        ContentProps={{
				          'aria-describedby': 'message-id',
				        }}
				        message={<span id="message-id">{this.props.Main.toastMsg}</span>}
				        action={[
				          <Button key="undo" style={{ color: '#ffc107' }} size="small" onClick={this.handleClose}>
				            DISMISS
				          </Button>,
				        ]}
				      />
				</div>
			);
		}
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(AppCanvas);