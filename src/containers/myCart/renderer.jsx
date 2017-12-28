import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Paper from 'material-ui/Paper';
import "./myCart.css";

export default function () {
    const totalAmount = this.getTotalAmount();

    return (
        <div>

            {
                this.props.orderedProducts && this.props.orderedProducts.length
                    ?
                    <div className="animated fadeInDownBig">
                        <Paper zDepth={3} className="cartDetailsContainer">
                            <table className="cartTable">
                                <thead>
                                    <tr>
                                        <th className='titleContainer'>Title</th>
                                        <th className='qtyContainer'>Quantity Ordered</th>
                                        <th className='unitPriceContainer'>Unit Price</th>
                                        <th className='incContainer'></th>
                                        <th className='decContainer'></th>
                                    </tr>
                                </thead>
                                <tbody className="bodyList">

                                    {
                                        this.props.orderedProducts.map((prd, index) => {
                                            return (
                                                <tr key={`summary-${index}`}>
                                                    <td className='titleContainer'>{prd.title}</td>
                                                    <td className='qtyContainer'>{prd.qty}</td>
                                                    <td className='unitPriceContainer'>{prd.unitPrice}</td>
                                                    <td className='incContainer'>
                                                        <FloatingActionButton onClick={this.props.onCartUpdate.bind(this, prd.productID, 1)} backgroundColor="#a4b357" mini={true}>
                                                            <ContentAdd />
                                                        </FloatingActionButton>
                                                    </td>
                                                    <td className='decContainer'>
                                                        <FloatingActionButton onClick={this.props.onCartUpdate.bind(this, prd.productID, -1)} backgroundColor="#a4b357" mini={true}>
                                                            <RemoveCircle />
                                                        </FloatingActionButton>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td className="rightAlignedElems">Total amount : </td>
                                        <td className="centerAlignedElems">{totalAmount}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="rightAlignedElems checkoutBtnContainer">
                                <RaisedButton label="Proceed to checkout" onClick={this.navigateToCheckoutView.bind(this)} />
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