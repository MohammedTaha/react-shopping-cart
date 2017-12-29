import { Component } from 'react';
import { connect } from 'react-redux';

import config from "../../config";
import axios from "axios";
import renderer from './renderer';



function mapStateToProps(state) {
    return {
        user: state.core.authenticatedUser,
        requestInProgress: state.core.isLoadingGIFVisible,
        orderedProducts: state.cart.cart.orderedProducts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateCheckoutDetails: (data, eve) => {
            eve.preventDefault();
            dispatch({ type: "SHOW_LOADING_GIF" });
            axios.post(`${config.serverURL}/ShoppingCart/UpdateCheckoutDetails`, {data})
                .then(response => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                })
                .catch(err => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in updating checkout details ", err);
                });
        }
    }
}



class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                completeName: this.props.user.completeName,
                address: "",
                city: "",
                stateOrProvince: "",
                postalOrZipCode: "",
                country: "",
                phoneNumber: ""
            }
        };
    }
    getTotalAmount() {
        let totalAmount = 0;
        this.props.orderedProducts.forEach((prd) => {
            if (prd.unitPrice && prd.qty) {
                totalAmount += (prd.unitPrice * prd.qty);
            }
        });
        return totalAmount;
    }
    handleChange(fieldName, eve, newVal) {
        let newState = { ...this.state.data };
        newState[fieldName] = newVal;
        this.setState({ data: newState });
    }
    
    navigateToProductsMasterList() {
        this.props.history.push("/app");
    }
    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);