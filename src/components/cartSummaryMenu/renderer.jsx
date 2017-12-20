import React from "react";
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';


export default function () {
    return (
        <div>
            <IconMenu
                iconButtonElement={
                    <IconButton>
                        <ShoppingCartIcon className = "appBarIcon" />
                    </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <h2>Item 01</h2>
                <h2>Item 01</h2>
                <h2>Item 01</h2>
                <h2>Item 01</h2>
            </IconMenu>
        </div>
    )
}