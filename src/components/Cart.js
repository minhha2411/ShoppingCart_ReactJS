import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import {removeProduct} from '../actions/cartAction';
import {orderProducts} from '../actions/orderAction';
import { connect } from 'react-redux';

const  Cart = (props) =>  {
    let cartItem = props.cartItems;
    let count = 0 ;
    
    const order = props.currentOrder;
    const [proceed , setProceed] = useState(false);
    const [checkout , setCheckout] = useState(false);
    const [inputs,setInputs] = useState(
        {
            email: '',
            name: '',
            address: ''
        }
    );
    const [modal,setModal] = useState(false);

    const submitForm = (e) => {
        setProceed(false);
        setCheckout(true);
        setModal(true);
        props.orderProducts(inputs,count);
        e.preventDefault();
    }
    
    const handleCheckout = (fieldName) => 
    ({target}) => setInputs(state => ({...state,[fieldName]:target.value}));


    const useStyles = makeStyles({
        root: {
            marginLeft: '16px',
            marginRight: '16px'
        },
        form: {
            marginBottom: '2rem'
        }
      });
    const classes = useStyles();
    const totalCount = () => {
        cartItem.map( item => (
            count = count + Math.ceil((parseFloat(item.price) * parseInt(item.count)))
        ))
    }
    totalCount();
    const closeOrder =() => {
        setModal(false);
        setCheckout(false);
    }


    return (
        
        <div className='cartContainer'> 

                {cartItem.length > 0  &&     
                        <div className='numberInCart'>
                             You have {cartItem.length} item in the Cart
                         </div>
                }
                {   cartItem.length > 0 

                    ? 
                   <>
                    {
                        cartItem.map(item => (
                            <div className='cart' key={item._id}>
                                <Fade left cascade>
                                <div className='cartItem'>
                                <img src={item.image} alt=''></img>
                                <h5>{item.title}</h5>
                                <span>{'$' + item.price} {' '} {'x '}{item.count}</span>
                                <Button color='secondary' variant='contained'
                                size='small' className={classes.root}
                                onClick={() => props.removeProduct(item)}
                                >Remove</Button>
                                </div>
                                </Fade>
                            </div>  
                        ))
                        
                    }
                    <div className='cartTotal'>
                        <h5>Total: {'$' + count} </h5>
                        <Button color='primary' variant='contained' size='large'
                        onClick={() => setProceed(true)}
                        >Proceed</Button>
                    </div>
                   </>
                    : 
                    <div className='cartEmpty'>Cart is Empty</div>
                }
                { proceed &&
                    <Fade right>
                    <form className='proceedForm' onSubmit={submitForm}>
                         <TextField  label="Email" type='email'  variant='outlined' name='email'
                         className={classes.form}
                         value={inputs.email}  onChange={handleCheckout('email')} />

                        <TextField  label="Name" type='text'  variant='outlined' name='name'
                         className={classes.form}
                         value={inputs.name} onChange={handleCheckout('name')} />

                        <TextField label="Address" type='text'  variant='outlined' name='address'
                         className={classes.form} onChange={handleCheckout('address')} value={inputs.address}
                         />
                        <Button color='primary' variant='contained' size='large' type='submit'
                        >Check Out</Button>
                    </form>
                    </Fade>
                }
                {/* Check out  */}
                {   checkout &&
                        <Modal isOpen={modal}>
                        <Zoom>
                        <button className='closeOrder'
                        onClick={closeOrder}>X</button>
                        <div className='orderHeader'>
                            <h4>Your order has been placed.</h4>
                            <h4>Order {order.id}</h4>
                        </div>
                        <div className='orderMain'>
                        <div className='orderLeft'>
                        <h4>Name: </h4>
                        <h4>Email: </h4>
                        <h4>Address: </h4>
                        <h4>Total: </h4>
                        </div>
                        <div className='orderRight'>
                        <h4>{order.name}</h4>
                        <h4>{order.email}</h4>
                        <h4>{order.address}</h4>
                        <h4>{'$' + order.total}</h4>
                        </div>
                        </div>
                        <h4 className='orderCartTitle'>Cart Items:</h4>
                        {order.cartItems.map(item => (
                            <div className='orderItem'>
                            <h4>{item.count} {'X ' + item.title}</h4>
                            </div>
                        ))}

                      
                        </Zoom>
                        </Modal>
        

                }
        </div>
    )
}
export default connect((state) => ({
    cartItems: state.cart.cartItems,
    orderProducts: state.order.orderProduct,
    currentOrder: state.order.currentOrder
}),
    {removeProduct , orderProducts}
)(Cart);