import {Component} from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import axios from 'axios';
import renderer from './renderer';
import config from "../../config";

function mapStateToProps(state) {
    return {
        user: (state.core && state.core.authenticatedUser ? state.core.authenticatedUser : null),
        auth_token: (state.core && state.core.auth_token ? state.core.auth_token : null)
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
            imageUploadInProcess: false,
            snackbar: {
                open: false,
                message: ""
            },
            pickedFile: null,
            formData: {
                title: "",
                unitsInStock: "",
                tags: [],
                tempTag: "",
                description: "",
                itemImage: ""
            }
        }
    }
    handleRequestClose() {
        this.setState({
            snackbar: {
                open: false,
                message: ""
            }
        });
    }
    onDrop(files) {
        if (files && files[0]) {
            this.setState({
                pickedFile: files[0],
                imageUploadInProcess: true,
                snackbar: {
                    open: true,
                    message: "Upload in progress"
                }
            });
            let upload = request.post(config.CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
                .field('file', files[0]);

            upload.end((err, response) => {
                this.setState({
                    imageUploadInProcess: false,
                    snackbar: {
                        open: false,
                        message: ""
                    }
                });
                if (err) {
                    console.log("error in upload", err);
                    return;
                }
                let uploadInfo = {
                    url: response.body.url,
                    bytes: response.body.bytes,
                    created_at: response.body.created_at,
                    original_filename: response.body.original_filename,
                    format: response.body.format,
                    height: response.body.height,
                    width: response.body.width,
                    signature: response.body.signature
                };
                console.log(" uploadInfo ", uploadInfo);
                this.updateFormData('itemImage', {}, uploadInfo);
            });
        }
    }
    updateFormData(fieldName, eve, newVal) {
        let formData = {
            ...this.state.formData
        };
        formData[fieldName] = newVal;
        this.setState({
            formData
        });
    }

    addNewTag(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (this.state.formData.tempTag) {
                let formData = { ...this.state.formData };
                formData.tags = (formData.tags || []).concat([]);
                formData.tags.unshift(this.state.formData.tempTag);
                formData.tempTag = "";
                this.setState({ formData });
            }
        }
    }

    deleteTag(index) {
        let formData = { ...this.state.formData };
        formData.tags = (formData.tags || []).concat([]);
        formData.tags.splice(index, 1);
        this.setState({ formData });
    }

    saveNewProductDetails(eve) {
        eve.preventDefault();

        axios.post(
            `${config.serverURL}/products/addNew`,
            { product: this.state.formData },
            { headers: { 'auth_token': this.props.auth_token } }
        )
            .then(() => {
                this.setState({
                    snackbar: { open: true, message: "Product saved" },
                    pickedFile: null,
                    formData: { title: "", unitsInStock: "", tags: "", description: "", itemImage: "" }
                });
            })
            .catch((err) => {
                console.log("Error in adding new product", err);
                debugger;
                this.setState({ snackbar: { open: true, message: "Somthing weird, failed to save product." } });
            })
    }

    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);