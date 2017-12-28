const defaultState = {
    adminsProducts: [],
    adminsFilteredProducts: [],

}

export default function adminActsReducer(state = defaultState, action = { type: "", payload: null }) {

    let newState = { ...state };
    switch (action.type) {
        case "SET_ADMINS_PRODUCTS":
            newState.adminsProducts = [].concat(action.payload)
            newState.adminsFilteredProducts = [].concat(action.payload);
            break;
        case "SET_ADMINS_FILTERED_PRDS":
        debugger;
            if (action.payload === "") {
                newState.adminsFilteredProducts = [].concat(newState.adminsProducts);
            } else {
                newState.adminsFilteredProducts = newState.adminsProducts.filter((prd) => {
                    let regex = new RegExp(action.payload, "ig");
                    return regex.test(prd.title);
                });
            }
            break;
        default:
        // console.log("unmatched case")
    }
    return newState;
}
