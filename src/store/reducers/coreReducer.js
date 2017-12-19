const defaultState = {
    authenticatedUser: null,
    auth_token: "",
    isLoadingGIFVisible: false
}

function coreReducer(state = defaultState, action = { type: "", payload: null }) {

    let newState = { ...state };
    switch (action.type) {
        case "SET_AUTHENTICATED_USER":
            newState.authenticatedUser = action.payload;
            return newState;
        case "SET_AUTH_TOKEN":
            newState.auth_token = action.payload;
            return newState;
        case "SHOW_LOADING_GIF":
            newState.isLoadingGIFVisible = true;
            return newState;
        case "HIDE_LOADING_GIF":
            newState.isLoadingGIFVisible = false;
            return newState;
        default:
            // console.log("unmatched case")
    }
    return newState;
}
export default coreReducer;