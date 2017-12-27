import React from 'react';
import AppBar from 'material-ui/AppBar';
import UserRoutes from '../../routes/userRoutes'
import { AppDrawer, CartSummaryMenu } from "../../components"

export default function () {
    return (
        <div>
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