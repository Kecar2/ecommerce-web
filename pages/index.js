import React from 'react';

import { Product, FooterBanner, HeroBanner } from '../components';

const Home = () => {
  return (
    <div>
      <HeroBanner />


      <div className="products-heading">
        <h2>Productos mas vendidos</h2>
        <p>Altavoces de muchas variedades</p>
      </div>

      <div className="products-container">
        {['Product 1', 'Product 2'].map((product) => product)}
      </div>

      <FooterBanner />
    </div>
  )
}

export default Home;