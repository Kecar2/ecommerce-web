import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { GiTechnoHeart } from 'react-icons/gi';
import {RiShoppingBag2Line} from 'react-icons/ri';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
      <GiTechnoHeart size={15}/><Link href="/">KeKar</Link> 
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <RiShoppingBag2Line /> 
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar