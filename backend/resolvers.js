const fs = require('fs');

const PRODUCTS_DATA_ROUTE = require('path').resolve(
  __dirname,
  './data/products.json'
);

const rawdata = fs.readFileSync(PRODUCTS_DATA_ROUTE);
const products = JSON.parse(rawdata);

const resolvers = {
  Query: {
    products: () => products,

    getProduct: (_, { id }) => {
      const product = products.find((product) => product.id === id);

      if (product === undefined) {
        return {
          __typename: 'NotFoundError',
          message: `Product with id ${id} not found.`
        };
      }

      return {
        __typename: 'Product',
        ...product
      };
    }
  },

  Mutation: {
    createProduct: (_, { input: { title, price, description, category, image } }) => {
      const maxId = Math.max(...products.map(product => product.id));

      const product = {
        id: maxId + 1, title, price, description, category, image
      };

      products.push(product);

      fs.writeFileSync(PRODUCTS_DATA_ROUTE, JSON.stringify(products), (err) => {
        console.log(err);
      });

      return {
        ...product
      };
    },

    updateProduct: (_, { input: { id, title, price, description, category, image } }) => {
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
          message: `Product with id ${id} not found.`
        };
      }

      const newProduct = { ...products[productIndex], title, price, description, category, image };
      products[productIndex] = newProduct;

      fs.writeFileSync(PRODUCTS_DATA_ROUTE, JSON.stringify(products), (err) => {
        console.log(err);
      });

      return {
        __typename: 'Product',
        ...newProduct
      };
    },

    deleteProduct: (_, { id }) => {
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
          message: `Product with id ${id} not found.`
        };
      }

      products.splice(productIndex, 1);

      fs.writeFileSync(PRODUCTS_DATA_ROUTE, JSON.stringify(products), (err) => {
        console.log(err);
      });

      return {
        message: 'Delete successfull.'
      };
    }
  }
};

module.exports = resolvers;
