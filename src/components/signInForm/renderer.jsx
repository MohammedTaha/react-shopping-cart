import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { CardText, CardActions } from 'material-ui/Card';

export default function () {
    return (
        <div>
            <Snackbar
                open={this.state.notificationMessage ? true : false}
                message={this.state.notificationMessage}
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose.bind(this)}
            />
            <CardText>
                <div>{JSON.stringify(this.state.dialogData)}</div>
                <div className="signInFormFields">
                    <TextField className='appTextField' value={this.state.data.username} onChange={this.handleChange.bind(this, 'username')} name='userName' hintText="User Name" fullWidth={true} floatingLabelText="Your user name" /><br />
                    <TextField className='appTextField' value={this.state.data.password} onChange={this.handleChange.bind(this, 'password')} name='password' hintText="Password" fullWidth={true} floatingLabelText="Your password" type="password" /><br />
                </div>
            </CardText>
            <CardActions className="rightAlignedElems">
                <FlatButton onClick={this.makeSignInAttempt.bind(this)} label="Sign in" />
            </CardActions>
        </div>
    );
}