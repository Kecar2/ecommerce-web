import React from 'react';
import Link from 'next/link';

import { BsCurrencyEuro } from 'react-icons/bs';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price }}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image && image[0])}
              width={250}
              height={250}
              className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">{price}<BsCurrencyEuro className="icon-refact"/></p>
        </div>
      </Link>
    </div>
  )
}

export default Product