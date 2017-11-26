import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import {Home, Login, AdminsView} from "../containers"

class AppRouter extends Component{
    render (){
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/Authenticate" component={Login}/>
                    <Route path="/Admin" component={AdminsView}/>
                </div>
            </Router>
        )
    }
}

export default AppRouter;