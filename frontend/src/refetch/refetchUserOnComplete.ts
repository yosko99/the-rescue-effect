import { ApolloClient } from '@apollo/client';

import TOKEN_HEADER from '../constants/token';
import { GET_CURRENT_USER_QUERY } from '../queries/user.queries';

const refetchUserOnComplete = (client: ApolloClient<object>) => {
  client.query({
    query: GET_CURRENT_USER_QUERY,
    context: {
      ...TOKEN_HEADER
    }
  });
};

export default refetchUserOnComplete;
