import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, []);

  return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
                <BsFillBagCheckFill />
            </p>
            <h2>Gracias por tu compra</h2>
            <p className="email-msg">Recibirás el Tickect en tu correo!</p>
            <p className="description">
                Correo de contacto
                <a className="email" href="mailto:pedido@kekar.com">pedido@kekar.com</a>
            </p>
            <Link href="/">
                <button type="button" className="btn" width="300px">
                    Seguir Comprando
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success;