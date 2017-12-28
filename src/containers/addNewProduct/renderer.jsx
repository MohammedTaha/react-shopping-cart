import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dropzone from 'react-dropzone'
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { Card, CardActions, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import "./addNewProduct.css"


export default function () {
    return (
        <div>

            <Snackbar
                open={this.state.snackbar.open}
                message={this.state.snackbar.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose.bind(this)}
            />

            <Card className='card_addNewProduct'>
                <CardText className='newProductDetails'>
                    <div className='imageContainer'>
                        {
                            this.state.pickedFile && this.state.pickedFile.preview
                                ?
                                <img className='previewImage' src={this.state.pickedFile.preview} alt="" />
                                :
                                this.state.formData && this.state.formData.itemImage && this.state.formData.itemImage.url
                                    ?
                                    <img className='previewImage' src={this.state.formData.itemImage.url} alt="" />
                                    :
                                    <Dropzone
                                        onDrop={this.onDrop.bind(this)}
                                        multiple={false}
                                        accept="image/*">
                                        <div>Drop an image or click to select a file to upload.</div>
                                    </Dropzone>


                        }
                    </div>
                    <div className='detailsContainer'>
                        <form id='form_newProductDetails' onSubmit={this.saveNewProductDetails.bind(this)}>
                            <TextField
                                floatingLabelText="Title"
                                fullWidth={true}
                                className='appTextField'
                                value={this.state.formData.title}
                                onChange={this.updateFormData.bind(this, 'title')}
                                required={true}
                                autoComplete="false"
                            /><br />
                            <TextField
                                floatingLabelText="Unit price"
                                fullWidth={true}
                                className='appTextField'
                                type='number'
                                value={this.state.formData.unitPrice}
                                onChange={this.updateFormData.bind(this, 'unitPrice')}
                                required={true}
                                min='0'
                            /><br />
                            <TextField
                                floatingLabelText="Units in stock"
                                fullWidth={true}
                                className='appTextField'
                                type='number'
                                value={this.state.formData.unitsInStock}
                                onChange={this.updateFormData.bind(this, 'unitsInStock')}
                                required={true}
                                min='0'
                            /><br />
                            <TextField
                                floatingLabelText="Description"
                                fullWidth={true}
                                className='appTextField'
                                value={this.state.formData.description}
                                onChange={this.updateFormData.bind(this, 'description')}
                            /><br />
                            <TextField
                                floatingLabelText="Tags"
                                hintText="Type and press enter."
                                fullWidth={true}
                                className='appTextField'
                                value={this.state.formData.tempTag}
                                onChange={this.updateFormData.bind(this, 'tempTag')}
                                onKeyDown={this.addNewTag.bind(this)}
                            /><br />


                            <List>

                                {this.state.formData.tags && this.state.formData.tags.map((tag, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            primaryText={tag}
                                            leftIcon={<DeleteIcon onClick={this.deleteTag.bind(this, index)} />}
                                        />);
                                })}
                            </List>

                        </form>
                    </div>

                </CardText>
                <CardActions className='rightAlignedElems'>
                    <RaisedButton label={this.state.formData._id ? "Update" : "Save"} type='submit' form="form_newProductDetails" />
                </CardActions>
            </Card>
        </div>
    )
}