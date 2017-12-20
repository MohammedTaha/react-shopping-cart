import React, { Component } from 'react';
import AppRouter from './routes';
import axios from 'axios';
import { connect } from 'react-redux';
import './App.css';

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
	constructor(props) {
		super(props);
		let auth_token = localStorage.getItem("auth_token");
		axios.interceptors.request.use((config) => {
			config.headers = config.headers || {};
			config.headers.auth_token = auth_token; 
			return config;
		})
	}
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