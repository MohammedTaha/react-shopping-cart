import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import {ProductsDetail, MyCart, Checkout, MyOrders} from "../containers"

export default class UserRouter extends Component{
    render (){
        console.log("Render User routes")
        return (
            <div>
                <Route exact path="/app/Product/:productID" component={ProductsDetail}/>
                <Route path="/app/MyCart" component={MyCart}/>
                <Route path="/app/Checkout" component={Checkout}/>
                <Route path="/app/MyOrders" component={MyOrders}/>
            </div>
        )
    }
}
