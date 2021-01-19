import {ORDER_PRODUCT} from '../actions/../types';

export const orderProducts = (order,total) => (dispath,getState) => {

    const orderProduct = getState().order.orderProduct.slice(); // []
    const cartItems = getState().cart.cartItems.slice(); // [{} ,{}]
    
    let orderItems = [];
    if(cartItems.length > 0 ) {
         cartItems.forEach(item => {
            orderItems.push({            // orderItems = [{count:  , title:  }]
                count: item.count,
                title: item.title
            })
        })
    }
    let currentOrder = {
        name: order.name,
        email: order.email,
        address: order.address,
        cartItems: orderItems,
        total: total,
        id: '_' + Math.random().toString(36).substr(2, 9),
    };
    orderProduct.push(currentOrder);
    localStorage.setItem('orderProduct' , JSON.stringify(orderProduct));

    dispath({
        type: ORDER_PRODUCT,
        payload: {orderProduct: orderProduct , currentOrder: currentOrder}
    })
}