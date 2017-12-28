import { createStore } from 'redux'
import { combineReducers, applyMiddleware } from 'redux';
import coreReducer from './reducers/coreReducer'
import shoppingCartReducer from './reducers/shoppingCartReducer'
import adminActsReducer from './reducers/adminActsReducer'
import thunk from 'redux-thunk';


const middleware = applyMiddleware(thunk);
export const rootReducer = combineReducers({ core: coreReducer, cart: shoppingCartReducer, admin : adminActsReducer });

let store = createStore(
    rootReducer,
    middleware
)

export default store;