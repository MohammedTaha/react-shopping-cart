import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AppRouter from './routes';

function mapStateToProps() {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		setLoggedInUser: (user) => {
			dispatch({ type: "SET_AUTHENTICATED_USER", payload: user });
		},
		setAutoToken: (token) => {
			dispatch({ type: "SET_AUTH_TOKEN", payload: token });
		}
	}
}

class App extends Component {
	componentWillMount() {
		let user = localStorage.getItem("user");
		let auth_token = localStorage.getItem("auth_token");
		if (user) {
			this.props.setLoggedInUser(JSON.parse(user))
		}
		if (auth_token) {
			this.props.setAutoToken(auth_token)
		}
	}
	render() {
		return (
			<div className="App" >
				<AppRouter />
			</div>
		);
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);