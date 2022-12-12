const typeDefs = `#graphql
    type Product {
        id: Int!
        title: String!
        price: Float!
        description: String!
        category: String!
        image: String!
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

    type SuccessfullRequest {
        message: String!
    }
 
    union ProductResult = Product | NotFoundError
    union DeleteProductResult =  SuccessfullRequest | NotFoundError

    type Query {
        products: [Product!]
        getProduct(id: Int!): ProductResult
    }

    input CreateProductInput {
        title: String!
        price: String!
        description: String!
        category: String!
        image: String!
    }

    input UpdateProductInput {
        id: Int!
        title: String
        price: Float
        description: String
        category: String
        image: String
    }

    type Mutation {
        createProduct(input: CreateProductInput!): Product!
        updateProduct(input: UpdateProductInput!): ProductResult
        deleteProduct(id: Int!): NotFoundError!
    }
`;

module.exports = typeDefs;
