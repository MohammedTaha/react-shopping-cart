import { Component } from "react";
import renderer from "./renderer"
import config from "../../config";
import axios from "axios";


export default class ProductsMasterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestInProgress: false,
            products: [],
            filteredProducts: []
        }
    }

    componentDidMount() {
        this.downloadAllActiveProducts();
    }

    downloadAllActiveProducts() {
        this.setState({ requestInProgress: true });

        axios.get(`${config.serverURL}/products/getAll/GetForUsers`)
            .then(response => {
                this.setState({ requestInProgress: false });
                console.log("Products Downloaded ", response.data);
                if (response.data && response.data.length) {
                    this.setState({ 
                        filteredProducts: response.data, //.concat(response.data).concat(response.data).concat(response.data).concat(response.data).concat(response.data), 
                        products: response.data//.concat(response.data).concat(response.data).concat(response.data).concat(response.data).concat(response.data) 
                    });
                }
            })
            .catch(err => {
                this.setState({ requestInProgress: false });
                console.log("Error in downloading all products", err);
            });

    }
    filterProducts(eve, newVal) {
        let filteredProducts = this.state.products.filter((prd) => {
            let regex = new RegExp(newVal, "ig");
            return regex.test(prd.title);
        });
        this.setState({ filteredProducts });
    }
    render() {
        return renderer.call(this);
    }
}