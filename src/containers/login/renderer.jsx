import React from 'react';
import { Card } from 'material-ui/Card';
import {SignInForm} from '../../components';


export default function () {
    return (
        <div>
            <Card className="animated flipInX signInFormCard">
                <div className='hintText rightAlignedElems'>
                    <span className='signupLinkWrapper' onClick={this.switchForms.bind(this)}>Do not have an account ?</span>
                </div>

                <div className='appLogo'></div>
                {

                    this.state.showLoginForm
                        ?
                        <SignInForm onSuccessfullAuth = {this.onSuccessfullAuth.bind(this)}/>
                        :
                        ""
                }


            </Card>
        </div>
    )
};
