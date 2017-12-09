import React from 'react';
import AppBar from 'material-ui/AppBar';
import { AppDrawer } from "../../components"

export default function () {
    return (
        <div>
            <AppDrawer user={this.props.user} sideMenuShown={this.state.sideMenuShown} closeMenu={this.closeMenu.bind(this)} />
            <AppBar
                title="Home"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
            />
            <h1>Seems nothing here..</h1>
            
        </div>
    )
}