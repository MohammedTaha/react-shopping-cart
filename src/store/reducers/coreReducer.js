function coreReducer(state = {}, action = { type: "", payload: null }) {

    let newState = { ...state };
    switch (action.type) {
        case "SET_AUTHENTICATED_USER":
            newState.authenticatedUser = action.payload;
            return newState;
        case "SET_AUTH_TOKEN":
            newState.auth_token = action.payload;
            return newState;
        case "SET_ACTIVE_VIEW":
            newState.activeView = action.payload;
            return newState;
        default:
            // console.log("unmatched case")

    }
    return newState;
}
export default coreReducer;