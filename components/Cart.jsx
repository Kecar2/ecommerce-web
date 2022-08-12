import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft } from 'react-icons/ai';

import { RiShoppingBag2Line } from 'react-icons/ri';

import { TiDeleteOutline } from 'react-icons/ti';
import { RiPaypalLine } from 'react-icons/ri';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { BsCurrencyEuro } from 'react-icons/bs';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Recargando...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Tu Carrito</span>
          <span className="cart-num-items">({totalQuantities} articulo/s)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <RiShoppingBag2Line size={150} />
            <h3>Tu bolsa está vacía</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Seguir comprando
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>{item.price}<BsCurrencyEuro size={15} /></h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                      <span className="num" onClick="">{item.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{totalPrice}<BsCurrencyEuro size={15} /></h3>
            </div>
            <div className="btn-container">
              <button type="button" className
                ="btn" onClick={handleCheckout}>
                <BsFillCreditCard2FrontFill size={15} /> Pagar con tarjeta
              </button>
            </div>
            <div className="btn-container">
              <button type="button" className
                ="btn-grey" onClick="">
                <RiPaypalLine size={15} className="paypal-item" /> PayPal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart