function coreReducer(state = {}, action={type : "", payload:  null}){

    switch(action.type){

        case "SET_AUTHENTICATED_USER": 
            let newState = {...state};
            newState.authenticatedUser = action.payload;
            return newState ;

    }

    return {...state};
}
export default coreReducer;