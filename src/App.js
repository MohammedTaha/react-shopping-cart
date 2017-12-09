import React, { Component } from 'react';
import {
	connect
} from 'react-redux';
import './App.css';
import AppRouter from './routes';

function mapStateToProps() {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		setLoggedInUser: (user) => {
			dispatch({ type: "SET_AUTHENTICATED_USER", payload: user });
		}
	}
}

class App extends Component {
	componentWillMount() {
		let user = localStorage.getItem("user");
		if (user) {
			this.props.setLoggedInUser(JSON.parse(user))
		}
	}
	render() {
		return (
			<div className="App">
				<AppRouter />
			</div>
		);
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);