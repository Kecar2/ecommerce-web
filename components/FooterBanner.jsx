import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2,smallText, saleTime, midText, product, buttonText, image, desc } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>Descuento - {discount}</p>
          <h3>{largeText1}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{midText}</p>
          <h3>{smallText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>

          </Link>
        </div>

        <img
          src={urlFor(image)} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner