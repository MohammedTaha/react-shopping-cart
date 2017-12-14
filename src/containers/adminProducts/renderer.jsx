import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import "./adminProducts.css";

export default function () {
    return (
        <div>
            {
                this.state.requestInProgress
                    ?
                    <div className="circularProgressWrapper">
                        <CircularProgress color="a4b357" size={100} thickness={6} />
                    </div>
                    : ""
            }


            {
                this.state.products.map((prd, index) => {

                    return (
                        <Paper zDepth={2} key={index} className="productDetailsWrapper">
                            <div className='linkToPrdEditContainer'> Update Details </div>
                            <div className="productDetailContainer">
                                <div className='productImageContainer'>
                                    <div className='productImage' style={{ backgroundImage: `url(${prd.itemImage.url})` }}></div>
                                </div>
                                <div className="productNameNDetails">
                                    <span className='productDescLabels'>Title : </span> <span className='productDescFields'>{prd.title}</span> <br />
                                    <span className='productDescLabels'>Description : </span> <span className='productDescFields'>{prd.description || "--"}</span> <br />
                                    <span className='productDescLabels'>Tags : </span> <span className='productDescFields'>{(prd.tags && prd.tags.length ? prd.tags.join(", ") : "--")}</span> <br />
                                    <span className='productDescLabels'>Units In Stock : </span> <span className='productDescFields'>{prd.unitsInStock || "0"}</span> <br />
                                </div>
                            </div>
                        </Paper>
                    )

                })
            }
        </div>
    )
}