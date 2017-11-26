import {
    Component
} from 'react';
import renderer from "./renderer";
import axios from "axios";
import config from "../../config";
import {
    connect
} from 'react-redux';
import "./login.css"

class Login extends Component {
    componentDidMount() {
        localStorage.removeItem("auth_token")
    }
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            notificationMessage: ""
        };
    }

    handleChange(fieldName, eve, newVal) {
        let newState = {};
        newState[fieldName] = newVal;
        this.setState(newState);
    }

    handleRequestClose() {
        this.setState({
            notificationMessage: ""
        });
    }

    makeSignInAttempt() {
        axios.post(`${config.serverURL}/auth/login`, this.state)
            .then(loginResponse => {
                let data = loginResponse.data;
                console.log("Logged in user ", loginResponse);
                if (data.status === 401) {
                    this.setState({
                        notificationMessage: data.text
                    });
                    return;
                }
                if (data.token) {
                    localStorage.setItem("auth_token", data.token);
                    this.props.history.push("/");
                }
            }).catch(err => {
                console.log("Error in signing in ", err);
            });

    }

    render() {
        return renderer.call(this);
    }
}
export default connect(() => {
    return {}
}, () => {
    return {}
})(Login);