import React from 'react';
import {Link} from 'react-router-dom';


export default function Header() {
    return (
        <div className='header'>
            <ul className='nav-bar'>
                <li className='homeLink'>
                   <Link to='/' style={{ textDecoration: 'none' , color: 'white'}}>React Shopping Cart</Link> 
                </li>
                <li className='adminLink'>
                   <Link to='/admin' style={{ textDecoration: 'none' , color: 'white'}}>Admin</Link> 
                </li>
            </ul>
        </div>
    )
}
