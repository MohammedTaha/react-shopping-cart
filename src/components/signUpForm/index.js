import {
    Component
} from 'react';
import axios from "axios";
import config from "../../config";
import renderer from './renderer';

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
                completeName: "",
                password: "",
                reconfirmPassword: "",
                registerAsAdmin: false
            },
            notificationMessage: "",
        };
    }
    handleChange(fieldName, eve, newVal) {
        let newState = {
            ...this.state.data
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
    registerAsAdminCheckBoxChangeHandler(eve, isChecked) {
        let newState = {
            ...this.state.data
        };
        newState.registerAsAdmin = isChecked;
        this.setState({
            data: newState
        });
    }
    makeSignUpAttempt() {


        this.trimTexts();

        if (this.validateSignUpDetails()) {
            axios.post(`${config.serverURL}/user/signup`, { user: this.state.data })
                .then(signUpResponse => {
                    let response = signUpResponse.data;
                    if (response) {
                        if (response.EMAIL_ID_TAKEN) {
                            this.setState({
                                notificationMessage: "Action denied, email already taken."
                            });
                            return;
                        }
                        if (response.auth_token) {
                            this.props.onSuccessfullAuth(response);
                        }
                    }
                }).catch(err => {
                    console.log("Error in signing in ", err);
                });
        }
    }


    trimTexts() {
        let dataset = {
            ...this.state.data
        };
        for (let props in dataset) {
            if (typeof dataset[props] === 'string') {
                dataset[props] = dataset[props].trim();
            }
        }
        this.setState({
            data: dataset
        });
    }

    validateSignUpDetails() {
        let validationPassed = true;
        if (!this.state.data.email || !this.state.data.completeName || !this.state.data.password || !this.state.data.reconfirmPassword) {
            this.setState({
                notificationMessage: "Missign required data"
            });
            validationPassed = false;
        }
        if (validationPassed && (this.state.data.password !== this.state.data.reconfirmPassword)) {
            this.setState({
                notificationMessage: "Passoword and reconfirm password mismatch."
            });
            validationPassed = false;
        }
        return validationPassed;
    }

    render() {
        return renderer.call(this);
    }
}