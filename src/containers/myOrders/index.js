import { Component } from 'react';
import { connect } from 'react-redux';

import config from "../../config";
import axios from "axios";
import renderer from './renderer';


function mapStateToProps(state) {
    return {
        allModifiedOrders: state.cart.allOrdersOfThisUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        downloadAllOrdersOfThisUser() {
            dispatch({ type: "SHOW_LOADING_GIF" });

            axios.get(`${config.serverURL}/ShoppingCart/GetAllOrders`)
                .then(response => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("All Orders of this user ", response.data);
                    if (response.data && response.data.length) {
                        dispatch({ type: "SET_ALL_ORDERS", payload: response.data });
                    }
                })
                .catch(err => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in downloading order ", err);
                });
        },
        markAsArchived(orderID, orderIndex) {

            dispatch({ type: "SHOW_LOADING_GIF" });
            axios.get(`${config.serverURL}/ShoppingCart/MarkAsArchived/${orderID}`)
                .then(response => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    dispatch({ type: "MARK_AS_ARCHIVED", payload: orderIndex });
                })
                .catch(err => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in downloading order ", err);
                });
        }
    }
}



class MyOrders extends Component {

    componentDidMount() {
        this.props.downloadAllOrdersOfThisUser();
    }
    navigateToShoppingCart() {
        this.props.history.push("/app/MyCart");
    }
    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);