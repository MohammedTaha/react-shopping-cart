import { Component } from 'react';
import { connect } from 'react-redux';

import config from "../../config";
import axios from "axios";
import renderer from './renderer';


function mapStateToProps(state) {
    return {
        requestInProgress: state.core.isLoadingGIFVisible,
        orderedProducts: state.cart.cart.orderedProducts
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
        },
        onCartUpdate: (prdID, qty) => {
            dispatch({ type: "SHOW_LOADING_GIF" });
            axios.post(`${config.serverURL}/ShoppingCart/UpdateList`, { prdID, qty })
                .then(response => {
                    dispatch({ type: "UPDATE_CART", payload: { prdID, qty } });
                    dispatch({ type: "HIDE_LOADING_GIF" });
                })
                .catch(err => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in updaing cart ", err);
                });
        }
    }
}



class MyCart extends Component {
    componentDidMount() {
        this.props.downloadExistingOrder();
    }
    navigateToCheckoutView() {
        this.props.history.push("/app/Checkout");
    }
    navigateToProductsMasterList() {
        this.props.history.push("/app");
    }
    getTotalAmount() {
        let totalAmount = 0;
        this.props.orderedProducts.forEach((prd) => {
            if(prd.unitPrice && prd.qty){
                totalAmount += (prd.unitPrice * prd.qty);
            }
        });
        return totalAmount;
    }
    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);