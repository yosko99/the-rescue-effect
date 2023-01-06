// @ts-nocheck
import { readFileSync, writeFileSync } from 'fs';

const PRODUCTS_DATA_ROUTE = require('path').resolve(
  __dirname,
  '../',
  './data/products.json'
);

const rawdata = readFileSync(PRODUCTS_DATA_ROUTE);
const products = JSON.parse(rawdata.toString());

const resolvers = {
  Query: {
    animals: () => products,

    getAnimal: (_, { id }) => {
      const product = products.find((product) => product.id === id);

      if (product === undefined) {
        return {
          __typename: 'NotFoundError',
          message: `Product with id ${id} not found.`,
        };
      }

      return {
        __typename: 'Product',
        ...product,
      };
    },
  },

  Mutation: {
    createAnimal: (_, { input: { name, age, description, category } }) => {
      // TODO Add dog api for imageURL
      const product = {
        name,
        age,
        description,
        category,
        imageURL,
      };

      products.push(product);

      writeFileSync(PRODUCTS_DATA_ROUTE, JSON.stringify(products));

      return {
        ...product,
      };
    },

    updateAnimal: (_, { input: { id, name, age, description, category } }) => {
      let productIndex = -1;

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          productIndex = i;
          break;
        }
      }

      if (productIndex === -1) {
        return {
          __typename: 'NotFoundError',
          message: `Product with id ${id} not found.`,
        };
      }

      const newProduct = {
        ...products[productIndex],
        title,
        price,
        description,
        category,
        image,
      };
      products[productIndex] = newProduct;

      writeFileSync(PRODUCTS_DATA_ROUTE, JSON.stringify(products));

      return {
        __typename: 'Product',
        ...newProduct,
      };
    },

    deleteAnimal: (_, { id }) => {
      let productIndex = -1;

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          productIndex = i;
          break;
        }
      }

      if (productIndex === -1) {
        return {
          __typename: 'NotFoundError',
          message: `Product with id ${id} not found.`,
        };
      }

      products.splice(productIndex, 1);

      writeFileSync(PRODUCTS_DATA_ROUTE, JSON.stringify(products));

      return {
        message: 'Delete successfull.',
      };
    },
  },
};

export default resolvers;
