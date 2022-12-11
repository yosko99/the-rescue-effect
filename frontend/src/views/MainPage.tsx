import React from 'react';

import { gql, useQuery } from '@apollo/client';

import Product from '../components/Product';
import { ProductType } from '../types/product.type';

const GET_PRODUCTS_QUERY = gql`
    query GetProducts {
        products {
            title
        }
    }
`;

const MainPage = () => {
  const { data, loading } = useQuery(GET_PRODUCTS_QUERY);

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

  return (
    <div className='App-header'>
        {data.products.map((product: ProductType, index: number) => (
            <Product key={index} product={product} />
        ))}
    </div>
  );
};

export default MainPage;
