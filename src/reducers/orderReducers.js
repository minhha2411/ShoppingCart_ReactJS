import {ORDER_PRODUCT} from '../actions/../types';

export const orderReducers = (state= {
    orderProduct: JSON.parse(localStorage.getItem("orderProduct") || "[]") ,
    currentOrder: {} } , action) => {
    switch (action.type) {
        case ORDER_PRODUCT:
        return {
            ...state,
            orderProduct: action.payload.orderProduct,
            currentOrder: action.payload.currentOrder
        }
        default:
        return state;
    }
}