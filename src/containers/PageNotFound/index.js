import {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import renderer from './renderer';


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
}



class PageNotFound extends Component {
    componentWillMount() {
        let auth_token = localStorage.getItem("auth_token");
        if (!auth_token) {
            // console.log("Invalid access")
            this.props.history.push("/Authenticate");
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            sideMenuShown: false
        };
        console.log("render Home")
    }

    openMenu() {
        this.setState({
            sideMenuShown: true
        })
    }
    closeMenu() {
        this.setState({
            sideMenuShown: false
        })
    }

    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);