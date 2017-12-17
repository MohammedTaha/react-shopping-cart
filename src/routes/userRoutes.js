import React, { Component } from 'react'
import {
    Route, Switch
} from 'react-router-dom'

import { ProductsMasterList, ProductsDetail, MyCart, Checkout, MyOrders } from "../containers"

export default class UserRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/app/Product/:productID" component={ProductsDetail} />
                <Route path="/app/MyCart" component={MyCart} />
                <Route path="/app/Checkout" component={Checkout} />
                <Route path="/app/MyOrders" component={MyOrders} />
                <Route component={ProductsMasterList}/>
            </Switch>
        )
    }
}
