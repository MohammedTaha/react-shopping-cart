import React from 'react';
import AppBar from 'material-ui/AppBar';
import { AdminDrawer } from "../../components"

export default function () {
    return (
        <div>
            <AdminDrawer user={this.props.user} sideMenuShown={this.state.sideMenuShown} closeMenu={this.closeMenu.bind(this)} />
            <AppBar
                title="Admin"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
            />
            <h1>{JSON.stringify(this.props.user)}</h1>
        </div>
    )
}