import {createStore , compose , combineReducers} from 'redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { cartReducers } from './reducers/cartReducers';
import {productsReducers} from './reducers/productsReducers';
import {orderReducers} from './reducers/orderReducers';

const initialStatte = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(
    {
        products: productsReducers,
        cart: cartReducers,
        order: orderReducers,
    }
) , initialStatte , composeEnhancer(applyMiddleware(thunk)));

export default store;
