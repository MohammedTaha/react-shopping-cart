import React from 'react';
import { Card } from 'material-ui/Card';
import { SignInForm, SignUpForm } from '../../components';


export default function () {
    return (
        <div>
            <Card className="signInFormCard">
                <div className='hintText rightAlignedElems'>
                    <span className='signupLinkWrapper' onClick={this.switchForms.bind(this)}>{this.state.showLoginForm ? 'Do not' :'Already'} have an account ?</span>
                </div>

                <div className='appLogo'></div>
                {

                    this.state.showLoginForm
                        ?
                        <SignInForm onSuccessfullAuth={this.onSuccessfullAuth.bind(this)} />
                        :
                        <SignUpForm onSuccessfullAuth={this.onSuccessfullAuth.bind(this)} />
                }


            </Card>
        </div>
    )
};
