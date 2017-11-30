import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { CardText, CardActions } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

export default function () {
    return (
        <div className='animated fadeInUp'>
            <Snackbar
                open={this.state.notificationMessage ? true : false}
                message={this.state.notificationMessage}
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose.bind(this)}
            />
            <CardText>
                <div>{JSON.stringify(this.state.dialogData)}</div>
                <div className="signInFormFields">
                    <TextField className='appTextField' value={this.state.data.completeName} onChange={this.handleChange.bind(this, 'completeName')} name='completeName' hintText="Complete Name" fullWidth={true} floatingLabelText="Your complete name" /><br />
                    <TextField className='appTextField' value={this.state.data.email} onChange={this.handleChange.bind(this, 'email')} name='userName' hintText="EMail ID" fullWidth={true} floatingLabelText="Your email ID" /><br />
                    <TextField className='appTextField' value={this.state.data.password} onChange={this.handleChange.bind(this, 'password')} name='password' hintText="Password" fullWidth={true} floatingLabelText="Your password" type="password" /><br />
                    <TextField className='appTextField' value={this.state.data.reconfirmPassword} onChange={this.handleChange.bind(this, 'reconfirmPassword')} name='password' hintText="Reconfirm password" fullWidth={true} floatingLabelText="Reconfirm password" type="password" /><br />
                    <Checkbox className='appCheckBox'
                        label="I'd like to add my own products aswell"
                        labelPosition="left"
                        checked={this.state.data.registerAsAdmin}
                        onCheck={this.registerAsAdminCheckBoxChangeHandler.bind(this)}
                    />
                </div>
            </CardText>
            <CardActions className="rightAlignedElems">
                <FlatButton onClick={this.makeSignUpAttempt.bind(this)} label="Sign Up" />
            </CardActions>
        </div>
    );
}