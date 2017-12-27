import React from 'react';
import AppBar from 'material-ui/AppBar';
import { AdminDrawer } from "../../components"
import AdminRoutes from '../../routes/adminRoutes'

export default function () {
    return (
        <div>
            <AdminDrawer user={this.props.user} sideMenuShown={this.state.sideMenuShown} closeMenu={this.closeMenu.bind(this)} />
            <AppBar
                title="Shop n Shop"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
            />
            <AdminRoutes/>
        </div>
    )
}