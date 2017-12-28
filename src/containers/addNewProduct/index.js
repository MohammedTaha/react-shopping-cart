import { Component } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import axios from 'axios';
import config from "../../config";
import renderer from './renderer';

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveNewProductDetails(eve) {
            eve.preventDefault();
            dispatch({ type: "SHOW_LOADING_GIF" });
            axios.post(`${config.serverURL}/products/addNew`, { product: this.state.formData })
                .then(() => {

                    if (this.state.formData._id) {
                        this.setState({
                            snackbar: { open: true, message: "Product updated" }
                        });
                        setTimeout(() => {
                            dispatch({ type: "HIDE_LOADING_GIF" });
                            this.props.history.push("/admin/MyProducts");
                        }, 2000);
                    }
                    else {
                        dispatch({ type: "HIDE_LOADING_GIF" });
                        this.setState({
                            snackbar: { open: true, message: "Product saved" },
                            pickedFile: null,
                            formData: { title: "", unitPrice: "", unitsInStock: "", tags: "", description: "", itemImage: "", _id: null }
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error in adding new product", err);
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    this.setState({ snackbar: { open: true, message: "Somthing weird, failed to save product." } });
                })
        },
        showLoadingGIF() {
            dispatch({ type: "SHOW_LOADING_GIF" });
        },
        hideLoadingGIF() {
            dispatch({ type: "HIDE_LOADING_GIF" });
        },
        downloadExistingProduct(pID) {
            dispatch({ type: "SHOW_LOADING_GIF" });
            axios.get(`${config.serverURL}/products/getProductById/${pID}`)
                .then((prd) => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    this.setState({
                        formData: { title: prd.data.title, unitPrice: prd.data.unitPrice, unitsInStock: prd.data.unitsInStock, tags: (prd.data.tags || []), tempTag: "", description: prd.data.description, itemImage: prd.data.itemImage, _id: prd.data._id }
                    });
                })
                .catch((err) => {
                    dispatch({ type: "HIDE_LOADING_GIF" });
                    console.log("Error in downloading product", err);
                    this.setState({ snackbar: { open: true, message: "Somthing weird, failed to save product." } });
                });
        }
    }
}


class AddNewProduct extends Component {
    activeProductID;
    constructor(props) {
        super(props);
        this.state = {
            imageUploadInProcess: false,
            snackbar: { open: false, message: "" },
            pickedFile: null,
            formData: { title: "", unitPrice: "", unitsInStock: "", tags: [], tempTag: "", description: "", itemImage: "", _id: null }
        }
        if (props.match.params && props.match.params.productID) {
            this.activeProductID = props.match.params.productID;
        }
    }
    componentDidMount(){
        if(this.activeProductID){
            this.props.downloadExistingProduct.call(this, this.activeProductID);
        }
    }
    handleRequestClose() {
        this.setState({
            snackbar: { open: false, message: "" }
        });
    }
    onDrop(files) {
        if (files && files[0]) {
            this.props.showLoadingGIF();
            this.setState({
                pickedFile: files[0],
                imageUploadInProcess: true,
                snackbar: { open: true, message: "Upload in progress" }
            });
            let upload = request.post(config.CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
                .field('file', files[0]);

            upload.end((err, response) => {
                this.props.hideLoadingGIF();
                this.setState({
                    imageUploadInProcess: false,
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


    render() {
        return renderer.apply(this);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);