import React from 'react';

import { useQuery } from '@apollo/client';

import CreateProductForm from '../components/CreateProductForm';
import Product from '../components/Product';
import { GET_PRODUCTS_QUERY } from '../queries/getProductsQuery';
import { ProductType } from '../types/product.type';

const MainPage = () => {
  const { data, loading } = useQuery(GET_PRODUCTS_QUERY);

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

  return (
    <div className='App-header'>
      <div className='container'>
        <CreateProductForm />

        <div className='d-flex flex-wrap' >
          {data.products.map((product: ProductType, index: number) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
