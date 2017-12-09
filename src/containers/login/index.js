import {
    Component
} from 'react';
import renderer from "./renderer";
import {
    connect
} from 'react-redux';
import "./login.css"

class Login extends Component {
    componentDidMount() {
        localStorage.removeItem("auth_token");
    }
    constructor(props) {
        super(props);
        this.state = {
            showLoginForm : true
        };
    }

    onSuccessfullAuth(user){
        console.log("USER ", user);
        localStorage.setItem("auth_token", user.auth_token);
        delete user.auth_token;
        localStorage.setItem("user", JSON.stringify(user));
        this.props.history.push("/app");
    }


    switchForms(){
        this.setState({showLoginForm : !this.state.showLoginForm});
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