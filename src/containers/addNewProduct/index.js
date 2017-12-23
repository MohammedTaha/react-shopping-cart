import { Component } from 'react';
import { connect } from 'react-redux';
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
                payload: "Add / Update Product Details"
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
            requestInProgress: false,
            imageUploadInProcess: false,
            snackbar: { open: false, message: "" },
            pickedFile: null,
            formData: { title: "", unitPrice : "", unitsInStock: "", tags: [], tempTag: "", description: "", itemImage: "", _id: null }
        }
        if (props.match.params && props.match.params.productID) {
            this.downloadExistingProduct(props.match.params.productID);
        }
    }
    handleRequestClose() {
        this.setState({
            snackbar: { open: false, message: "" }
        });
    }
    onDrop(files) {
        if (files && files[0]) {
            this.setState({
                pickedFile: files[0],
                imageUploadInProcess: true,
                requestInProgress: true,
                snackbar: { open: true, message: "Upload in progress" }
            });
            let upload = request.post(config.CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
                .field('file', files[0]);

            upload.end((err, response) => {
                this.setState({
                    imageUploadInProcess: false,
                    requestInProgress: false,
                    snackbar: { open: false, message: "" }
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
        let formData = { ...this.state.formData };
        formData[fieldName] = newVal;
        this.setState({ formData });
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
        this.setState({ requestInProgress: true });
        // console.log(this.state.formData);
        axios.post(
            `${config.serverURL}/products/addNew`,
            { product: this.state.formData },
            { headers: { 'auth_token': this.props.auth_token } }
        )
            .then(() => {

                if (this.state.formData._id) {
                    this.setState({
                        snackbar: { open: true, message: "Product updated" },
                        requestInProgress: true
                    });
                    setTimeout(()=>{
                        this.props.history.push("/admin/MyProducts");
                    }, 2000);
                }
                else {
                    this.setState({
                        snackbar: { open: true, message: "Product savedsaved" },
                        requestInProgress: false,
                        pickedFile: null,
                        formData: { title: "", unitPrice : "", unitsInStock: "", tags: "", description: "", itemImage: "", _id: null }
                    });
                }
            })
            .catch((err) => {
                console.log("Error in adding new product", err);
                this.setState({ requestInProgress: false, snackbar: { open: true, message: "Somthing weird, failed to save product." } });
            })
    }

    downloadExistingProduct(pID) {
        // this.setState({requestInProgress : true});
        axios.get(
            `${config.serverURL}/products/getProductById/${pID}`,
            { headers: { 'auth_token': this.props.auth_token } }
        )
            .then((prd) => {
                // console.log(" downloaded prd ", prd.data);
                this.setState({
                    formData: { title: prd.data.title, unitPrice : prd.data.unitPrice, unitsInStock: prd.data.unitsInStock, tags: (prd.data.tags || []), tempTag: "", description: prd.data.description, itemImage: prd.data.itemImage, _id: prd.data._id }
                });
            })
            .catch((err) => {
                console.log("Error in downloading product", err);
                this.setState({ snackbar: { open: true, message: "Somthing weird, failed to save product." } });
            })
    }

    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);