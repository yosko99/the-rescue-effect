import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { CREATE_PRODUCT_MUTATION } from '../mutations/createProductMutation';
import { GET_PRODUCTS_QUERY } from '../queries/getProductsQuery';
import { CreateProductType } from '../types/product.type';

const CreateProductForm = () => {
  const [productData, setProductData] = useState<CreateProductType>({
    category: '',
    description: '',
    image: '',
    price: 0,
    title: ''
  });
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const { refetch } = useQuery(GET_PRODUCTS_QUERY);

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

  return (
        <form className='d-flex flex-column mb-2' onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <div>
                <div className="form-group">
                    <label htmlFor='title'>Title</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name='title'
                        id="title"
                        placeholder="Product title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='description'>Description</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name='description'
                        id="Description"
                        placeholder="Product description"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='image'>Image URL</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name='image'
                        id="image"
                        placeholder="Product image URL"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='price'>Price</label>
                    <input
                        type="number"
                        required
                        min={1}
                        className="form-control"
                        name='price'
                        id="price"
                        placeholder="Product price"
                     />
                </div>
                <div className="form-group">
                    <label htmlFor='category'>Category</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="category"
                        name='category'
                        placeholder="Product category"
                     />
                </div>
            </div>
            <div>
                <button type="submit" className="w-100 btn btn-success">Submit</button>
            </div>
        </form>
  );
};

export default CreateProductForm;
