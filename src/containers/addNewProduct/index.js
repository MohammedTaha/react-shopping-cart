import {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

import renderer from './renderer';


function mapStateToProps(state) {
    return {
        user: {
            _id: "u-01"
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
}



class AddNewProduct extends Component {
    componentWillMount() {
        let auth_token = localStorage.getItem("auth_token");
        if (!auth_token) {
            console.log("Invalid access")
            //this.props.history.push("/Authenticate");
        }
    }
    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);