import React from 'react';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';


export default function () {
    return (
        <div className="drawerContainer">
            <Drawer width={300} open={this.props.sideMenuShown}>

                <AppBar
                    title="Menu"
                    showMenuIconButton={false}
                    className="customAppBar"
                    iconElementRight={<FloatingActionButton onClick={this.props.closeMenu} mini={true} backgroundColor="#627d4d"> <i className="fa fa-times" /> </FloatingActionButton>}
                />
                <h3>{this.props.user && this.props.user._id ? this.props.user._id : "Not logged In"}</h3>
                <Link onClick={this.props.closeMenu} className="customLinks" to="/app"> <MenuItem> Home </MenuItem> </Link>
                <Link onClick={this.props.closeMenu} className="customLinks" to="/app/myOrders"> <MenuItem> My Orders </MenuItem> </Link>
                <Link onClick={this.props.closeMenu} className="customLinks" to="/Admin"> <MenuItem> Admin Panel </MenuItem> </Link>
                <Divider />
                <Link className="customLinks" to="/Authenticate"> <MenuItem>Logout </MenuItem> </Link>



            </Drawer>
        </div>

    );
}