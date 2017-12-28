import { Component } from 'react';
import { connect } from 'react-redux';
import renderer from './renderer';
import axios from "axios"
import config from "../../config";


function mapStateToProps(state) {
    return {
        filteredProducts: state.admin.adminsFilteredProducts,
        products: state.admin.adminsProducts
    };
}


function mapDispatchToProps(dispatch) {
    return {
        downloadAllProductsOfThisAdmin: () => {
            dispatch({ type: "SHOW_LOADING_GIF" });
            axios.get(`${config.serverURL}/products/getAll/GetForAdmin`)
                .then((response) => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    if (response.data && response.data.length) {
                        dispatch({ type: "HIDE_LOADING_GIF" });
                        dispatch({ type: "SET_ADMINS_PRODUCTS", payload: response.data });
                    }
                })
                .catch((err) => {
                    console.log("Error in downloading products ", err);
                    dispatch({ type: "HIDE_LOADING_GIF" });
                })
        },
        setFilteredProducts: (filterText) => {
            dispatch({ type: "SET_ADMINS_FILTERED_PRDS", payload: filterText });
        }

    }
}

class AdminsProducts extends Component {
    componentDidMount() {
        this.props.downloadAllProductsOfThisAdmin();
    }
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts: []
        }
    }
    filterProducts(eve, newVal) {
        this.props.setFilteredProducts(newVal);
    }
    moveToUpdateView(id) {
        this.props.history.push(`/admin/Product/${id}`);
    }

    render() {
        return renderer.apply(this);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminsProducts);
