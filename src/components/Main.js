import React, { Component } from 'react';
import Filter from './Filter';
import Products from './Products';
import Cart from './Cart';

// import store from '../store';
// import {Provider} from 'react-redux';

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state={
          products: [],
          cart: [], 
          currentItem: {},          
        }

      }

    render(){
     
    return (
      <>
  
        <div className='main-content'>
            <div className='main-left'>
            <Filter></Filter>
            <Products></Products>
            </div>
            <div className='main-right'>
              <Cart></Cart>
            </div>
        </div>     
      </>
    )
        }
}
