import {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import renderer from './renderer';

function mapStateToProps(state) {
    return {
        user: (state.core && state.core.authenticatedUser ? state.core.authenticatedUser : null)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setActiveView: () => {
            dispatch({
                type: "SET_ACTIVE_VIEW",
                payload: "Add New Product"
            });
        },
        unsetActiveView: () => {
            dispatch({
                type: "SET_ACTIVE_VIEW",
                payload: ""
            });
        }
    }
}

class AddNewProduct extends Component {
    componentDidMount() {
        this.props.setActiveView();
    }
    componentWillUnmount() {
        this.props.unsetActiveView();
    }

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                title: "",
                unitsInStock: 0,
                tags: "",
                description: ""
            }
        }
    }

    onDrop(files) {
        console.log(files[0]);
    }
    updateFormData(fieldName, eve, newVal) {
        let formData = { ...this.state.formData };
        formData[fieldName] = newVal;
        this.setState({ formData });
    }
    saveNewProductDetails(eve) {
        console.log(this.state.formData);
        eve.preventDefault();
    }

    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);