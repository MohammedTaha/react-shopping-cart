import { Component } from "react";
import renderer from "./renderer"
import config from "../../config";
import axios from "axios";
import { connect } from "react-redux";


function mapStateToProps(store) {
    return {
        requestInProgress: store.core.isLoadingGIFVisible,
        filteredProducts: store.cart.filteredProducts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCartUpdate: (prdID, qty) => {
            dispatch({ type: "UPDATE_CART", payload: { prdID, qty } });
            // dispatch({ type: "SHOW_LOADING_GIF" });
            // dispatch({ type: "UPDATE_CART", payload: { prdID, qty } });
            // axios.post("/ShoppingCart/UpdateList", {prdID, qty})
            //     .then(response => {
            //         dispatch({ type: "HIDE_LOADING_GIF" });
            //     })
            //     .catch(err => {
            //         dispatch({ type: "HIDE_LOADING_GIF" });

            //     });
        },
        downloadAllActiveProducts: () => {
            dispatch({ type: "SHOW_LOADING_GIF" });

            axios.get(`${config.serverURL}/products/getAll/GetForUsers`)
                .then(response => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    if (response.data && response.data.length) {
                        dispatch({
                            type: "DOWNLOADED_ALL_PRODUCTS",
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
            dispatch({ type: "SET_FILTERED_PRDS", payload : filterText });
        }

    }
}

class ProductsMasterList extends Component {

    componentDidMount() {
        this.props.downloadAllActiveProducts();
    }

    filterProducts(eve, newVal) {
        this.props.setFilteredProducts(newVal);
    }
    render() {
        return renderer.call(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMasterList);