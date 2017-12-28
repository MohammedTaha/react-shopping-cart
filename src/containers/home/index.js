import { Component } from 'react';
import { connect } from 'react-redux';
import renderer from './renderer';
import axios from 'axios';
import config from '../../config';

function mapStateToProps(state) {
    return {
        requestInProgress: state.core.isLoadingGIFVisible,
        user: state.core.authenticatedUser,
        orderedProducts: state.cart.cart.orderedProducts,
        totalProductsOrdered: state.cart.cart.totalProductsOrdered
    };
}

function mapDispatchToProps(dispatch) {
    return {
        downloadExistingOrder: () => {
            dispatch({ type: "SHOW_LOADING_GIF" });

            axios.get(`${config.serverURL}/ShoppingCart/UpdatedList`)
                .then(response => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    if (response.data && response.data.orderedProducts && response.data.orderedProducts.length) {
                        dispatch({ type: "SET_DOWNLOADED_ORDER", payload: response.data.orderedProducts });
                    }
                })
                .catch(err => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in downloading order ", err);
                });
        }
    }
}




class Home extends Component {
    componentWillMount() {
        let auth_token = localStorage.getItem("auth_token");
        if (!auth_token) {
            this.props.history.push("/Authenticate");
        }
    }
    componentDidMount() {
        this.props.downloadExistingOrder();
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
        // console.log(" orderedProducts : ",  this.props.orderedProducts)
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);