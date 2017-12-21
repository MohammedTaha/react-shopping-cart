import React from "react";
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import { DisplayProduct } from "../../components"
import "./productsMasterList.css";

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
            <div className="filterProductsContainer rightAlignedElems" >
                <TextField
                    className="appTextField"
                    hintText="Filter Products"
                    onChange={this.filterProducts.bind(this)}
                /><br />
            </div>
            <div className='productsListWrapper'>
                {

                    this.props.filteredProducts.map((prd, index) => {
                        return (
                            <DisplayProduct
                                prd={prd}
                                key={'prd-' + index}
                                onCartUpdate={this.onCartUpdate.bind(this)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}