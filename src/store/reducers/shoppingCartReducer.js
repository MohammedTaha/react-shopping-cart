const defaultState = {
    filteredProducts: [],
    products: [],
    cart: {
        orderedProducts: [],
        totalProductsOrdered: 0
    },
    allOrdersOfThisUser: {
        original: [],
        modified: []
    }
}

function shoppingCartReducer(state = defaultState, action = { type: "", payload: null }) {

    let newState = { ...state };
    switch (action.type) {
        case "SET_DOWNLOADED_PRODUCTS":
            newState.filteredProducts = [].concat(action.payload);
            newState.products = [].concat(action.payload);
            break;
        case "SET_FILTERED_PRDS":
            if (action.payload === "") {
                newState.filteredProducts = [].concat(newState.products);
            } else {
                newState.filteredProducts = newState.products.filter((prd) => {
                    let regex = new RegExp(action.payload, "ig");
                    return regex.test(prd.title);
                });
            }
            break;
        case "SET_DOWNLOADED_ORDER":
            newState.cart.totalProductsOrdered = 0;
            newState.cart.orderedProducts = action.payload;
            action.payload.forEach(function (prd) {
                newState.cart.totalProductsOrdered += prd.qty;
            });
            break;
        case "UPDATE_CART":
            let i = 0;
            let alreadyOrderedProduct = [].concat(newState.cart.orderedProducts);
            for (i; i < alreadyOrderedProduct.length; i++) {
                if (alreadyOrderedProduct[i].productID === action.payload.prdID) {
                    if (action.payload.qty === 1) {
                        alreadyOrderedProduct[i].qty++;
                    } else {
                        if (alreadyOrderedProduct[i].qty === 1) {
                            alreadyOrderedProduct.splice(i, 1);
                        } else {
                            alreadyOrderedProduct[i].qty--;
                        }
                    }
                    break;
                }
            }

            if (i === alreadyOrderedProduct.length && action.payload.qty === 1) {
                for (i; i < newState.products.length; i++) {
                    if (newState.products[i]._id === action.payload.prdID) {
                        let newProductToInsert = {
                            ...newState.products[i]
                        };
                        newProductToInsert.qty = 1;
                        newProductToInsert.productID = newProductToInsert._id;
                        delete newProductToInsert._id;
                        delete newProductToInsert.unitsInStock;
                        delete newProductToInsert.createdBy;
                        delete newProductToInsert.createdById;

                        alreadyOrderedProduct.push(newProductToInsert);
                    }
                }
            }
            newState.cart.orderedProducts = alreadyOrderedProduct;
            if (action.payload.qty === 1) {
                newState.cart.totalProductsOrdered++;
            } else {
                newState.cart.totalProductsOrdered--;
            }
            break;
        case "SET_ALL_ORDERS":
            newState.allOrdersOfThisUser.original = [].concat(action.payload);
            newState.allOrdersOfThisUser.modified = newState.allOrdersOfThisUser.original.map((o) => {
                let obj = {
                    _id : o._id,
                    checkedoutOn: "--",
                    numberOfItems: (o.orderedProducts && o.orderedProducts.length ? o.orderedProducts.length : 0),
                    totalCharges: (o.totalCharges || 0),
                    status: (o.status === 0 ? "Initiated" : "Confirmed")
                };
                if (o.shippingDetails && o.shippingDetails.checkedoutOn) {
                    obj.checkedoutOn = new Date(o.shippingDetails.checkedoutOn).toLocaleDateString();
                }
                return obj;
            });
            console.log("newState.allOrdersOfThisUser");
            console.log(newState.allOrdersOfThisUser);
            break;
        default:
    }
    return newState;
}
export default shoppingCartReducer;