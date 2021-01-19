import React  from 'react'
import { connect } from 'react-redux';
import {sortProduct,  filterProduct} from '../actions/productsAction';

const  Filter = (props) =>  {


    return (
            !props.filterProducts  ? <div>...Loading</div>
            :
            <div className='filter'>
            <div className='numberProducts'>{props.filterProducts.length + ' Products'}</div>
            <div className='orderProducts'>
               Order 
               <select name='Order' value={props.sort} onChange={(e) => props.sortProduct(props.filterProducts , e.target.value)}>
                   <option value='Latest'>Latest</option>
                   <option value='Lowest'>Lowest</option>
                   <option value='Highest'>Highest</option>
               </select>
            </div>
            <div className='filterProducts'>
               Filter
               <select name='Filter' value={props.size} onChange={(e) => props.filterProduct(props.products , e.target.value)}>
                   <option value='ALL'>All</option>
                   <option value='X'>X</option>
                   <option value='XS'>XS</option>
                   <option value='S'>S</option>
                   <option value='M'>M</option>
                   <option value='L'>L</option>
                   <option value='XL'>XL</option>
                   <option value='XXL'>XXL</option>
               </select>
            </div>
           </div>
     
    )
}
export default connect( ((state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filterProducts: state.products.filteredItems,
})),
{
    filterProduct,
    sortProduct
})(Filter);