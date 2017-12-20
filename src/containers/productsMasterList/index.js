import { Component } from "react";
import { connect } from "react-redux";
import renderer from "./renderer"
import config from "../../config";
import axios from "axios";



function mapStateToProps(state) {
    return {
        requestInProgress: state.core.isLoadingGIFVisible,
        filteredProducts: state.cart.filteredProducts,
        orderedProducts: state.cart.cart.orderedProducts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCartUpdate: (prdID, qty) => {
            dispatch({ type: "UPDATE_CART", payload: { prdID, qty } });
            /*
            dispatch({ type: "SHOW_LOADING_GIF" });
            axios.post(`${config.serverURL}/ShoppingCart/UpdateList`, {prdID, qty})
                .then(response => {
                    dispatch({ type: "UPDATE_CART", payload: { prdID, qty } });
                    dispatch({ type: "HIDE_LOADING_GIF" });
                })
                .catch(err => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in updaing cart ", err);
                });
            */
        },
        downloadAllActiveProducts: () => {
            dispatch({ type: "SHOW_LOADING_GIF" });

            axios.get(`${config.serverURL}/products/getAll/GetForUsers`)
                .then(response => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    if (response.data && response.data.length) {
                        dispatch({
                            type: "SET_DOWNLOADED_PRODUCTS",
                            payload: response.data
                        });
                    }
                })
                .catch(err => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in downloading all products", err);
                });
        },
        setFilteredProducts: (filterText) => {
            dispatch({ type: "SET_FILTERED_PRDS", payload: filterText });
        },
        unsetDownloadedProductsList: () => {
            dispatch({ type: "SET_DOWNLOADED_PRODUCTS", payload: [] });
        }

    }
}

class ProductsMasterList extends Component {

    componentWillMount() {
        this.props.unsetDownloadedProductsList();
    }
    componentDidMount() {
        this.props.downloadAllActiveProducts();
    }

    filterProducts(eve, newVal) {
        this.props.setFilteredProducts(newVal);
    }
    validateCartUpdateAction(prdID, qty) {
        let flag = false;
        if (qty === -1) {
            if (this.props.orderedProducts) {
                for (let i = 0; i < this.props.orderedProducts.length; i++) {
                    if (this.props.orderedProducts[i].productID === prdID) {
                        flag = true;
                        break;
                    }
                }
            }
        } else {
            flag = true;
        }
        return flag;
    }
    onCartUpdate(prdID, qty) {
        if (this.validateCartUpdateAction(prdID, qty)) {
            this.props.onCartUpdate(prdID, qty);
        } else {
            console.warn("Inapproprate action");
        }
    }
    render() {
        return renderer.call(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMasterList);