import {
    createStore
} from 'redux'
import {
    combineReducers,
    applyMiddleware
} from 'redux';
import coreReducer from './reducers/coreReducer'
import thunk from 'redux-thunk';


const middleware = applyMiddleware(thunk);
export const rootReducer = combineReducers({core : coreReducer});

let store = createStore(
    rootReducer,
    middleware
)

store.subscribe(() =>
    console.log(store.getState())
);

export default store;