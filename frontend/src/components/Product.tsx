import React, { FC } from 'react';

import { ProductType } from '../types/product.type';

interface Props {
    product: ProductType;
}

const Product: FC<Props> = ({ product }) => {
  return (
    <div>{product.title}</div>
  );
};

export default Product;
