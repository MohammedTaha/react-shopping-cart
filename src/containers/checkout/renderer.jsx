import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


import "./checkout.css";

export default function () {
    return (
        <div>
            <Paper zDepth={3}
                className="checkoutForm">
                <TextField
                    className='appTextField'
                    value={this.state.data.completeName}
                    onChange={this.handleChange.bind(this, 'completeName')}
                    name='completeName'
                    floatingLabelText="Complete Name"
                    hintText="Complete Name"
                    fullWidth={true}
                    disabled={true}
                /><br />

                <TextField
                    className='appTextField'
                    value={this.state.data.address}
                    onChange={this.handleChange.bind(this, 'address')}
                    name='address'
                    hintText="Address"
                    floatingLabelText="Address"
                    fullWidth={true}
                /><br />

                <TextField
                    className='appTextField'
                    value={this.state.data.city}
                    onChange={this.handleChange.bind(this, 'city')}
                    name='city'
                    hintText="City"
                    floatingLabelText="City"
                    fullWidth={true}
                /><br />

                <TextField
                    className='appTextField'
                    value={this.state.data.stateOrProvince}
                    onChange={this.handleChange.bind(this, 'stateOrProvince')}
                    name='stateOrProvince'
                    hintText="State Or Province"
                    floatingLabelText="State Or Province"
                    fullWidth={true}
                /><br />

                <TextField
                    className='appTextField'
                    value={this.state.data.postalOrZipCode}
                    onChange={this.handleChange.bind(this, 'postalOrZipCode')}
                    name='postalOrZipCode'
                    hintText="Postal Or ZipCode"
                    floatingLabelText="Postal Or ZipCode"
                    fullWidth={true}
                /><br />

                <TextField
                    className='appTextField'
                    value={this.state.data.country}
                    onChange={this.handleChange.bind(this, 'country')}
                    name='countrycity'
                    hintText="Country"
                    floatingLabelText="Country"
                    fullWidth={true}
                /><br />

                <TextField
                    className='appTextField'
                    value={this.state.data.phoneNumber}
                    onChange={this.handleChange.bind(this, 'phoneNumber')}
                    name='phoneNumber'
                    hintText="Phone Number"
                    floatingLabelText="Phone Number"
                    fullWidth={true}
                /><br />

            </Paper>

        </div>
    )
}