import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone'
import { Card, CardActions, CardText } from 'material-ui/Card';
import "./addNewProduct.css"


export default function () {
    return (
        <div>
            <Card className='card_addNewProduct'>
                <CardText className='newProductDetails'>
                    <div className='imageContainer'>
                        <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)}>
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        </Dropzone>
                    </div>
                    <div className='detailsContainer'>
                        <form id='form_newProductDetails' onSubmit={this.saveNewProductDetails.bind(this)}>
                            <TextField
                                floatingLabelText="Title"
                                fullWidth={true}
                                className='appTextField'
                                value={this.state.formData.title}
                                onChange={this.updateFormData.bind(this, 'title')}
                            /><br />
                            <TextField
                                floatingLabelText="Units in stock"
                                fullWidth={true}
                                className='appTextField'
                                value={this.state.formData.unitsInStock}
                                onChange={this.updateFormData.bind(this, 'unitsInStock')}
                            /><br />
                            <TextField
                                floatingLabelText="Tags"
                                hintText="Separate tags by comma"
                                fullWidth={true}
                                className='appTextField'
                                value={this.state.formData.tags}
                                onChange={this.updateFormData.bind(this, 'tags')}
                            /><br />
                            <TextField
                                floatingLabelText="Description"
                                fullWidth={true}
                                className='appTextField'
                                value={this.state.formData.description}
                                onChange={this.updateFormData.bind(this, 'description')}
                            /><br />

                        </form>
                    </div>

                </CardText>
                <CardActions className='rightAlignedElems'>
                    <RaisedButton label="Save" type='submit' form="form_newProductDetails" />
                </CardActions>
            </Card>
        </div>
    )
}