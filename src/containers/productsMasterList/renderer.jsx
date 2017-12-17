import React from "react";
import CircularProgress from 'material-ui/CircularProgress';
import { DisplayProduct } from "../../components"


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

                this.state.filteredProducts.map((prd, index) => {
                    return <DisplayProduct prd={prd} key={'prd-' + index} />
                })
            }
        </div>
    )
}