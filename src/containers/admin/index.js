import {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import renderer from './renderer';


function mapStateToProps(state) {
    return {
        user: (state.core && state.core.authenticatedUser ? state.core.authenticatedUser : null)
    };
}

class AdminsView extends Component {
    componentWillMount() {
        let auth_token = localStorage.getItem("auth_token");
        if (!auth_token) {
            this.props.history.push("/Authenticate");
        } else if(this.props.user && this.props.user.role  && (this.props.user.role !== 'admin')) {
            this.props.history.push("/app");
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            sideMenuShown: false
        };
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

export default connect(mapStateToProps)(AdminsView);