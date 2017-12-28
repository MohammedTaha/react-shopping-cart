import React from 'react';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import UserRoutes from '../../routes/userRoutes'
import { AppDrawer, CartSummaryMenu } from "../../components"

export default function () {
    return (
        <div>
            {
                this.props.requestInProgress
                    ?
                    <div className="circularProgressWrapper">
                        <CircularProgress color="a4b357" size={100} thickness={6} />
                    </div>
                    : ""
            }
            <AppDrawer user={this.props.user} sideMenuShown={this.state.sideMenuShown} closeMenu={this.closeMenu.bind(this)} />
            <AppBar
                title="Shop n Shop"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
                iconElementRight={
                    <CartSummaryMenu
                        orderedProducts={this.props.orderedProducts}
                        totalProductsOrdered={this.props.totalProductsOrdered}
                    />
                }
            />
            <UserRoutes />
        </div>
    )
}