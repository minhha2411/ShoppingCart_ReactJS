import {ADD_ITEM_TO_CART , REMOVE_ITEM_FROM_CART} from '../actions/../types';

export const cartReducers = (
    state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") 
            }                                                                  
    ,action
    ) => {
    switch(action.type){
        case ADD_ITEM_TO_CART:
        return{
            cartItems: action.payload.cartItems
        }
        case REMOVE_ITEM_FROM_CART:
        return{
            cartItems: action.payload.cartItems
        }
        default: 
        return state;
        
    }
}