import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import { Home, Login, AdminsView, PageNotFound } from "../containers"

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/app" component={Home} />
                        <Route path="/Authenticate" component={Login} />
                        <Route path="/Admin" component={AdminsView} />
                        <Redirect from="/" to="/app" />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default AppRouter;