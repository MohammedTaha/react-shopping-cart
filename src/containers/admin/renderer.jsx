import React from 'react';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import { AdminDrawer } from "../../components"
import AdminRoutes from '../../routes/adminRoutes'

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
            }            <AdminDrawer user={this.props.user} sideMenuShown={this.state.sideMenuShown} closeMenu={this.closeMenu.bind(this)} />
            <AppBar
                title="Shop n Shop"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
            />
            <AdminRoutes />
        </div>
    )
}