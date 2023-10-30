import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { cartReducer, wishlistReducer } from "./cartReducer";
import { generalReducer } from "./generalReducer";


const reducers = combineReducers({
    allProducts: productReducer,
    cart: cartReducer,
    general: generalReducer
})

export default reducers;