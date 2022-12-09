const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
];

const resolvers = {
  Query: {
    books: () => books,
    getBook: (parent, { title }) => {
      const book = books.find((book) => book.title === title);

      if (book === undefined) {
        return {
          __typename: 'NotFoundError',
          message: `Entity ${title} not found`
        };
      } else {
        return book;
      }
    }
  }
};

module.exports = resolvers;
