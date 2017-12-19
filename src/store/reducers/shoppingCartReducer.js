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
        case "DOWNLOADED_ALL_PRODUCTS":
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
                if (newState.cart.orderedProducts[i]._id === action.payload.prdID) {
                    if (action.payload.qty === 1) {
                        newState.cart.orderedProducts[i].orderedQty++;
                    } else {
                        if (newState.cart.orderedProducts[i].orderedQty === 1) {
                            newState.cart.orderedProducts.splice(i, 1);
                        } else {
                            newState.cart.orderedProducts[i].orderedQty--;
                        }
                    }
                    break;
                }
            }

            if (i === newState.cart.orderedProducts.length && action.payload.qty === 1) {
                for (i; i < newState.products.length; i++) {
                    if (newState.products[i]._id === action.payload.prdID) {
                        newState.cart.orderedProducts.push({...newState.products[i]});
                        newState.cart.orderedProducts[newState.cart.orderedProducts.length - 1].orderedQty = 1;
                    }
                }
            }

            console.log(newState.cart.orderedProducts);
            break;
        default:
    }
    return newState;
}
export default shoppingCartReducer;