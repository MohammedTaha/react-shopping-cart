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
        this.props.history.push("/");
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