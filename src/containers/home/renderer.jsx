import React from 'react';
import AppBar from 'material-ui/AppBar';
import { AppDrawer } from "../../components"
import UserRoutes from '../../routes/userRoutes'


export default function () {
    return (
        <div>
            <AppDrawer user={this.props.user} sideMenuShown={this.state.sideMenuShown} closeMenu={this.closeMenu.bind(this)} />
            <AppBar
                title="Home"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
            />
            <h1>{JSON.stringify(this.props.user)}</h1>
            <UserRoutes />
        </div>
    )
}