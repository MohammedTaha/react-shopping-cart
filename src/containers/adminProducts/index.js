import { Component } from 'react';
import { connect } from 'react-redux';
import renderer from './renderer';
import axios from "axios"
import config from "../../config";


function mapStateToProps(state) {
    return {
        user: (state.core && state.core.authenticatedUser ? state.core.authenticatedUser : null),
        auth_token: (state.core && state.core.auth_token ? state.core.auth_token : null)
    };
}


function mapDispatchToProps(dispatch) {
    return {
        setActiveView: () => {
            dispatch({
                type: "SET_ACTIVE_VIEW",
                payload: "My Products"
            });
        },
        unsetActiveView: () => {
            dispatch({
                type: "SET_ACTIVE_VIEW",
                payload: ""
            });
        }
    }
}

class AdminsProducts extends Component {
    componentDidMount() {
        this.downloadAllProductsOfThisAdmin();
    }
    constructor(props) {
        super(props);
        this.state = {
            requestInProgress: false,
            products : []
        }
    }

    downloadAllProductsOfThisAdmin() {
        this.setState({ requestInProgress: true });
        axios.get(
            `${config.serverURL}/products/getAll/GetForAdmin`,
            { headers: { 'auth_token': this.props.auth_token } }
        )
            .then((response) => {
                this.setState({ requestInProgress: false });
                if(response.data && response.data.length){
                    this.setState({products : response.data});
                }
            })
            .catch((err) => {
                console.log("Error in downloading products ", err);
                this.setState({ requestInProgress: false });
            })
    }
    render() {
        return renderer.apply(this);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminsProducts);
