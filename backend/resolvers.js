const fs = require('fs');

const rawdata = fs.readFileSync(require('path').resolve(__dirname, './data/products.json'));
const products = JSON.parse(rawdata);

const resolvers = {
  Query: {
    products: () => products,

    getProduct: (_parent, { id }) => {
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
  }
};

module.exports = resolvers;
