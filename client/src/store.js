import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import {ProductDetailsReducer, productReducer} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
  } from "./reducers/userReducer";

const reducer=combineReducers({
    products:productReducer,
    product_details:ProductDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    cart: cartReducer,
});
const value=localStorage.getItem('cartItems');
let initialState={
    cart:{
        cartItems:value===undefined?[]:JSON.parse(value),
    }
};
const middleware=[thunk];

const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;