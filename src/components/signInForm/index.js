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
        let newState = {...this.state.data};
        newState[fieldName] = newVal;
        this.setState({data : newState});
    }

    handleRequestClose() {
        this.setState({
            notificationMessage: ""
        });
    }
    makeSignInAttempt() {

        console.log(this.state.data);
        this.props.onSuccessfullAuth(this.state.data)
        /*
        
            TEMP CHANGES
        
        axios.post(`${config.serverURL}/auth/login`, this.state.data)
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
            });*/

        // setTimeout(() => {
        //     this.props.history.push("/");
        // }, 2000);

    }


    render() {
        return renderer.call(this);
    }
}