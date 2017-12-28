import React from "react";
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';


export default function () {
    return (
        <div>
            {
                this.props.totalProductsOrdered > 0
                    ?
                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <ShoppingCartIcon className="appBarIcon" />
                            </IconButton>
                        }
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <div className="orderedProductsSummaryMenu">

                            {
                                this.props.orderedProducts.map((prd, index) => {
                                    return (
                                        <MenuItem key={`item-${index}`}>{prd.title} : {prd.qty}</MenuItem>
                                    )
                                })
                            }
                        </div>
                    </IconMenu>
                    :
                    ""
            }
        </div>
    )
}