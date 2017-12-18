import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle-outline';
import ActionRemove from 'material-ui/svg-icons/content/remove-circle-outline';


import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import "./displayProducts.css";

export default function () {
    return (
        <div>
           
            <div className="displayProductWrapper">
                <Card>
                    <CardMedia>
                        <img src={this.props.prd.itemImage.url} alt="" />
                    </CardMedia>
                    <CardTitle title={this.props.prd.title} />
                    <CardText>{this.props.prd.description}</CardText>
                    <CardActions className="centerAlignedElems">
                        <RaisedButton onClick={this.addProdToCart.bind(this)} icon={<ActionAdd />} />
                        <RaisedButton onClick={this.removeProdFromCart.bind(this)} icon={<ActionRemove />} />
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}