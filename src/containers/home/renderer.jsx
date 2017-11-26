import React from 'react';
import AppBar from 'material-ui/AppBar';

export default function () {
    return (
        <div>
            <AppBar
                title="Home"
                className="customAppBar"
                onLeftIconButtonTouchTap={this.openMenu.bind(this)}
            />
            <h1>{JSON.stringify(this.props.user)}</h1>
        </div>
    )
}