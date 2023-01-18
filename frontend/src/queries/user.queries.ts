import { gql } from '@apollo/client';

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      email
      gender
      animalPreferences
      imageURL
      animals {
        id
        name
        age
        isAdopted
        description
        category
        imageURL
        updatedAt
      }
    }
  }
`;
