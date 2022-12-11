import React, { useState } from 'react';

import { gql, useQuery, useMutation } from '@apollo/client';

import Product from '../components/Product';
import { CreateProductType, ProductType } from '../types/product.type';

const GET_PRODUCTS_QUERY = gql`
    query GetProducts {
        products {
            title
        }
    }
`;

const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            title
        }
    }
`;

const MainPage = () => {
  const { data, loading, refetch } = useQuery(GET_PRODUCTS_QUERY);
  const [productData, setProductData] = useState<CreateProductType>({
    category: '',
    description: '',
    image: '',
    price: 0,
    title: ''
  });
  const [createProduct, { data: mutationData, loading: mutationLoading }] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setProductData(() => {
      return {
        ...productData,
        [target.name as keyof CreateProductType]: target.value
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct({ variables: { input: productData } });
    refetch();
  };

  if (loading) {
    return <div className='App-header'>Loading</div>;
  }

  return (
    <div className='App-header'>
        {data.products.map((product: ProductType, index: number) => (
            <Product key={index} product={product} />
        ))}
        <form onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="price">Price</label>
            <input type="value" name="title" id="price" />
            <label htmlFor="image">Image</label>
            <input type="text" name="image" id="image" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
            <label htmlFor="category">Category</label>
            <input type="text" name="category" id="Category" />
            <button>submit</button>
        </form>
    </div>
  );
};

export default MainPage;
