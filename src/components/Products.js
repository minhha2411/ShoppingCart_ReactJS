import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import {fetchProduct} from '../actions/productsAction';
import {addProduct} from '../actions/cartAction';
 const Products = (props) => {
    const [modal , setModal] = useState(false);
    const [product , setProduct] = useState(null);
   
    useEffect(() => {
        props.fetchProduct();
    }, []);

    const useStyles = makeStyles({
        root: {
            marginRight: '15px'
        },
        modalBtn: {
            fontSize: '10px'
        }
      });
    const classes = useStyles();
    const products = props.products;
    const showModal = (product) => {
        setModal(true);
        setProduct(product);
    }
  
    return (
        <>
        {!products ? 
        (<div>...Loading</div>)
            :
            <Fade bottom cascade>
            <div className='products'>
                {
                    
                    products.map( item => (
                        <div className='item' key={item._id}>
                            <Link to={'/' + item._id} style={{textDecoration: 'none', color: 'black'}}>
                            <div onClick={() => showModal(item)}>
                            <img src={item.image} className='itemImage' alt=''></img>
                            <h5 className='itemTitle'>{item.title}</h5>
                            </div>
                            </Link>
                            <span className='itemPrice'>{'$' + item.price}</span>
                            <Button className={classes.root} color='primary' 
                            variant='contained' size='large' onClick={() => props.addProduct(item)}>Add to Cart</Button>

                        </div>
                    ))
                    
                }
            </div>
        </Fade>
        
            
        }
        
        {/* {products.length > 0 &&
       
        } */}
        {
            product !== null &&
            <Modal isOpen={modal}>
                <Zoom>
            <div className='modalContainer'>
                <div className='modalImage'>
                    <img src={product.image} className='itemImage' alt=''></img>
                </div>
                <div className='modalDescription'>
                    <div className='modalHeader'>
                    <h4>{product.title}</h4>
                    <button onClick={() => setModal(false)}>X</button>
                    </div>
                    <p>{product.description}</p>
                    <div className='modalSize'>
                    <p>AvailableSizes:</p>
                    <span>{product.availableSizes.map(size => (
                        <button className='buttonSize' >{size}</button>
                    ))}</span>
                    </div>
                    <div className='modalAdd'>
                    <h4>{'$' + product.price}</h4>
                    <Button color='primary' 
                    variant='contained' 
                    style={{width: '250px'}}
                    onClick={() => props.addProduct(product)}
                    >Add to Cart</Button>
                    </div>
                   
                </div>
            </div>
            </Zoom>
            </Modal>
        }
        </>
    )
}
export default connect((state) => ({products: state.products.filteredItems}) , {fetchProduct ,addProduct})(Products);
