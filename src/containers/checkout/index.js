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



class Checkout extends Component {
    componentDidMount() {
        //this.props.downloadExistingOrder();
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {
                completeName: "TAHA",
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
    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);