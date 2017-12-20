import React from 'react';
import AppBar from 'material-ui/AppBar';
import { AppDrawer, CartSummaryMenu } from "../../components"
import UserRoutes from '../../routes/userRoutes'

export default function () {
    return (
        <div>
            <AppDrawer user={this.props.user} sideMenuShown={this.state.sideMenuShown} closeMenu={this.closeMenu.bind(this)} />
            <AppBar
                title="Home"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
                iconElementRight={ <CartSummaryMenu />}
            />
            <UserRoutes />
        </div>
    )
}