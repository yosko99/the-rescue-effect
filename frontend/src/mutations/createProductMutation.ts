import { gql } from '@apollo/client';

export const CREATE_PRODUCT_MUTATION = gql`
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    title
  }
}`;
