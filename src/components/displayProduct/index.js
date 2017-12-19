import { Component } from "react";
import renderer from "./renderer";

export default class DisplayProduct extends Component { 


    addProdToCart(){
        this.props.onCartUpdate(this.props.prd._id, 1);
    }
    removeProdFromCart(){
        this.props.onCartUpdate(this.props.prd._id, -1);
    }
    render(){
        return renderer.call(this);
    }

}