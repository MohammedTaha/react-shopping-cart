
import {Component} from "react";
import renderer from "./renderer";

export default class CartSummaryMenu extends Component{

    render(){
        return renderer.call(this);
    }

}