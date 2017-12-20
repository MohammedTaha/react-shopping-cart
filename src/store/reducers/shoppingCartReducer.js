const defaultState = {
    filteredProducts: [],
    products: [],
    cart: {
        orderedProducts: []
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
        case "UPDATE_CART":
            let i = 0;
            for (i; i < newState.cart.orderedProducts.length; i++) {
                if (newState.cart.orderedProducts[i].productID === action.payload.prdID) {
                    if (action.payload.qty === 1) {
                        newState.cart.orderedProducts[i].qty++;
                    } else {
                        if (newState.cart.orderedProducts[i].qty === 1) {
                            newState.cart.orderedProducts.splice(i, 1);
                        } else {
                            newState.cart.orderedProducts[i].qty--;
                        }
                    }
                    break;
                }
            }

            if (i === newState.cart.orderedProducts.length && action.payload.qty === 1) {
                for (i; i < newState.products.length; i++) {
                    if (newState.products[i]._id === action.payload.prdID) {
                        let newProductToInsert = { ...newState.products[i] };
                        newProductToInsert.qty = 1;
                        newProductToInsert.productID = newProductToInsert._id;
                        delete newProductToInsert._id;
                        delete newProductToInsert.unitsInStock;
                        delete newProductToInsert.createdBy;
                        delete newProductToInsert.createdById;

                        newState.cart.orderedProducts.push(newProductToInsert);

                    }
                }
            }
            break;
        default:
    }
    return newState;
}
export default shoppingCartReducer;