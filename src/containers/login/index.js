import {
    Component
} from 'react';
import renderer from "./renderer";
import {
    connect
} from 'react-redux';
import "./login.css"

function mapDispatchToProps(dispatch) {
    return {
        setLoggedInUser: (user) => {
            dispatch({
                type: "SET_AUTHENTICATED_USER",
                payload: user
            });
        },
        setAutoToken: (token) => {
            dispatch({
                type: "SET_AUTH_TOKEN",
                payload: token
            });
        }
    }
}


class Login extends Component {
    componentDidMount() {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
    }
    constructor(props) {
        super(props);
        this.state = {
            showLoginForm: true
        };
    }

    onSuccessfullAuth(user) {
        console.log("USER ", user);

        let auth_token = user.auth_token;

        delete user.auth_token;
        localStorage.setItem("auth_token", auth_token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user) {
            if (user.role === "admin") {
                this.props.history.push("/admin");
            } else {
                this.props.history.push("/app");
            }

            this.props.setLoggedInUser(JSON.parse(user))
        }
        if (auth_token) {
            this.props.setAutoToken(auth_token)
        }
    }


    switchForms() {
        this.setState({
            showLoginForm: !this.state.showLoginForm
        });
    }
    render() {
        return renderer.call(this);
    }
}
export default connect(() => {
    return {}
}, mapDispatchToProps)(Login);