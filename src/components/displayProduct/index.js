import { Component } from "react";
import renderer from "./renderer";

export default class DisplayProduct extends Component { 


    addProdToCart(){
        console.log("Add Product", this.props.prd._id);
    }
    removeProdFromCart(){
        console.log("Remove Product", this.props.prd._id);
    }
    render(){
        return renderer.call(this);
    }

}