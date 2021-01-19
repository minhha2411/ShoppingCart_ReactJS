import {ADD_ITEM_TO_CART , REMOVE_ITEM_FROM_CART } from '../actions/../types';


export const addProduct = ( product) => (dispath,getState) => {
    
    const cartItems = getState().cart.cartItems.slice();
    let alReadyExists = false;
    cartItems.forEach((x) => {
        if(x._id === product._id){
            alReadyExists = true;
            x.count++;
        }
    });
    if(!alReadyExists){
        cartItems.push({...product , count: 1});

    }
    dispath({
        type: ADD_ITEM_TO_CART,
        payload: {cartItems},
    })
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
}

export const removeProduct = ( product) => (dispath,getState) => {
    const cartItems = getState().cart.cartItems.slice().filter((x) => x._id !== product._id);
    dispath({
        type: REMOVE_ITEM_FROM_CART,
        payload: {cartItems}
    });
    localStorage.setItem('cartItems' , JSON.stringify(cartItems));
}

