import React, { FC } from 'react';

import { ProductType } from '../types/product.type';

interface Props {
  product: ProductType;
}

const Product: FC<Props> = ({ product }) => {
  return (
    <div className="card" style={{ width: '10rem' }}>
      <img className="card-img-top" src={product.image} alt={product.title}/>
        <div className="card-body">
          <h5 className="card-title text-black">{product.title}</h5>
          <p className="card-text text-black">{product.description}</p>
          <a href="#" className="btn btn-primary">Button</a>
        </div>
    </div>
  );
};

export default Product;
