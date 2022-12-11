const typeDefs = `#graphql
    type Product {
        id: Int
        title: String
        price: Float
        description: String
        category: String
        image: String
        rating: ProductRating
        translations: [ProductTranslation]
    }

    type ProductRating {
        rate: Float!
        count: Int!
    }

    type ProductTranslation {
        lang: String!
        title: String!
        description: String!
    }

    interface BaseError {
        message: String!
    }

    type InvalidInputError implements BaseError {
        message: String!
    }
    
    type NotFoundError implements BaseError {
        message: String!
    }
    
    type UnknownError implements BaseError {
        message: String!
    }
    
    type NotAllowedError implements BaseError {
        message: String!
    }
 
    union ProductResult = Product | NotFoundError

    type Query {
        products: [Product!]
        getProduct(id: Int!): ProductResult
    }
`;

module.exports = typeDefs;
