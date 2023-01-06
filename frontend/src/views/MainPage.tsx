import React from 'react';

import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';

import CreateProductForm from '../components/CreateProductForm';
import ProductCard from '../components/ProductCard';
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
        <Typography align='center' fontSize={'1em'}>No data :(</Typography>
        {data === undefined
          ? <Typography align='center'>No data</Typography>
          : <div className='d-flex flex-wrap' >
          {data.products.map((product: ProductType, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        }
      </div>
    </div>
  );
};

export default MainPage;
