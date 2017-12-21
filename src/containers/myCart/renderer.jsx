import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Paper from 'material-ui/Paper';
import "./myCart.css";

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
            }

            {
                this.props.orderedProducts && this.props.orderedProducts.length
                    ?
                    <div className="animated fadeInDownBig">
                        <Paper zDepth={3} className="cartDetailsContainer">

                            {
                                this.props.orderedProducts.map((prd, index) => {
                                    return (
                                        <div key={`summary-${index}`}>
                                            <div className="shoppingCartItem">
                                                <span className="titleContainer wrapperEl">
                                                    {prd.title}
                                                </span>
                                                <span className="qtyContainer wrapperEl">
                                                    {prd.qty}
                                                </span>
                                                <span className="qtyUpdatesContainer wrapperEl">
                                                    <span className="incContainer">
                                                        <FloatingActionButton onClick={this.props.onCartUpdate.bind(this, prd.productID, 1)} backgroundColor="#a4b357" mini={true}>
                                                            <ContentAdd />
                                                        </FloatingActionButton>
                                                    </span>
                                                    <span className='decContainer'>
                                                        <FloatingActionButton onClick={this.props.onCartUpdate.bind(this, prd.productID, -1)} backgroundColor="#a4b357" mini={true}>
                                                            <RemoveCircle />
                                                        </FloatingActionButton>
                                                    </span>
                                                </span>
                                            </div>
                                            <Divider />
                                        </div>
                                    )
                                })
                            }

                            <div className="rightAlignedElems checkoutBtnContainer">
                                <RaisedButton label="Proceed to checkout"  onClick={this.navigateToCheckoutView.bind(this)} />
                            </div>
                        </Paper>
                    </div>
                    :
                    <Paper zDepth={3} className="container-emptyCart" onClick={this.navigateToProductsMasterList.bind(this)}>
                        Your cart is empty at the moment, please add one or more products from this list.
                    </Paper>
            }


        </div>
    )
}