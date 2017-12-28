import React from "react";
import TextField from 'material-ui/TextField';
import { DisplayProduct } from "../../components"
import "./productsMasterList.css";

export default function () {

    return (
        <div>
            
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