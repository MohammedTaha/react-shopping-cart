import React, { Component } from 'react'
import {
    Route
} from 'react-router-dom'

import { ProductsDetail, AddNewProduct, AdminsOrders, AdminsProducts } from "../containers"

export default class AdminRouter extends Component {
    render() {
        return (
            <div>
                <Route exact path="/admin/Product" component={AddNewProduct} />
                <Route exact path="/admin/Product/:productID" component={ProductsDetail} />
                <Route path="/admin/MyOrders" component={AdminsOrders} />
                <Route path="/app/MyProducts" component={AdminsProducts} />
            </div>
        )
    }
}
