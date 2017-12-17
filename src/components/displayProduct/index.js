import { Component } from "react";
import renderer from "./renderer";

export default class DisplayProduct extends Component { 

    render(){
        return renderer.call(this);
    }

}