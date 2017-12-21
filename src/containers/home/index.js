import { Component } from 'react';
import { connect } from 'react-redux';
import renderer from './renderer';

function mapStateToProps(state) {
    return {
        user: (state.core && state.core.authenticatedUser ? state.core.authenticatedUser : null),
        orderedProducts : state.cart.cart.orderedProducts,
        totalProductsOrdered :  state.cart.cart.totalProductsOrdered
    };
}


class Home extends Component {
    componentWillMount() {
        let auth_token = localStorage.getItem("auth_token");
        if (!auth_token) {
            this.props.history.push("/Authenticate");
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            sideMenuShown: false
        };
    }

    openMenu() {
        this.setState({
            sideMenuShown: true
        })
    }
    closeMenu() {
        this.setState({
            sideMenuShown: false
        })
    }

    render() {
        // console.log(" orderedProducts : ",  this.props.orderedProducts)
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps)(Home);