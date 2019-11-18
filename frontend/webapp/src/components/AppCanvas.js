import React, { Component } from 'react';
import { connect } from 'react-redux';

import PublicContent from './PublicContent';
import ClientHome from './ClientHome';


import {
	changePageState
} from '../actions/actionCreators';


const mapStateToProps = state => {
  return {
    Main: state.Main
  }
}


const mapDispatchToProps = dispatch => ({
	changePageState: (state) => dispatch(changePageState(state)),
})



class AppCanvas extends Component {
	constructor(props) {
    	super(props);
    	this.renderPublicContent = this.renderPublicContent.bind(this)
    	this.renderClientHome = this.renderClientHome.bind(this)
	}

	renderPublicContent() {
		if (this.props.Main.pageState !== 'DEFAULT') {
			return (<div className="PublicContentWrapper"></div>);
		} else {
			return (
				<div className="PublicContentWrapper">
					<PublicContent />
				</div>
			);
		}
	}

	renderClientHome() {
		if (this.props.Main.pageState !== 'HOME') {
			return (<div className="ClientHomeWrapper"></div>);
		} else {
			return (
				<div className="ClientHomeWrapper">
					<ClientHome />
				</div>
			);
		}
	}

	render () {
		return (
			<div className="AppCanvas">
				{this.renderPublicContent()}
				{this.renderClientHome()}
			</div>
		);
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(AppCanvas);