import {
    Component
} from 'react';
import axios from "axios";
import config from "../../config";
import renderer from './renderer';

export default class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                password: ""
            },
            notificationMessage: "",
        };
    }
    handleChange(fieldName, eve, newVal) {
        let newState = { ...this.state.data
        };
        newState[fieldName] = newVal;
        this.setState({
            data: newState
        });
    }

    handleRequestClose() {
        this.setState({
            notificationMessage: ""
        });
    }
    makeSignInAttempt() {

        axios.post(`${config.serverURL}/user/login`, this.state.data)
            .then(loginResponse => {
                let response = loginResponse.data;
                if (response.auth_token) {
                    this.props.onSuccessfullAuth(response);
                }
            }).catch(err => {
                console.log("error in signing in ", err);
                if (err.response && err.response.data && err.response.data.message) {
                    this.setState({
                        notificationMessage: err.response.data.message
                    });
                    return;
                }
            });
    }


    render() {
        return renderer.call(this);
    }
}