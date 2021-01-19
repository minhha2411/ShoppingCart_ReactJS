import {FETCH_PRODUCTS} from '../actions/../types';
import { FILTER_PRODUCTS_BY_SIZE , ORDER_PRODUCTS_BY_PRICE} from '../actions/../types';


export const fetchProduct = () => async (dispath) => {
    const res =  await fetch(`data.json`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }).then(response => response.json())
        .then(data => data.products );
       ;
        dispath({
            type: FETCH_PRODUCTS,
            payload: res
        }
        );
        
}

export const filterProduct = (products , size) => (dispath) => {
    
    dispath({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: 
            size === '' || size === 'ALL' ? 
            products 
            :
            products.filter(item => item.availableSizes.indexOf(size) >= 0)
        }
        
    });
    
}

export const sortProduct = (filterProduct , sort) => (dispath) => {
    const sortedProduct = filterProduct.slice();
    if(sort === 'Latest' || sort ===''){
        sortedProduct.sort((a,b) => (
            a._id > b._id ?
            1 : -1
        ))
    }
    else if(sort === 'Lowest'){
        sortedProduct.sort((a,b) => (
            a.price > b.price ? 
            1 : -1
        ))
    }
    else if(sort === 'Highest'){
        sortedProduct.sort((a,b) => (
            a.price > b.price ? 
            -1 : 1
        ))
    }
    dispath({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProduct
        }
    })
}

