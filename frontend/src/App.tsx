import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import MainPage from './views/MainPage';

function App () {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: '/graphql'
  });

  return (
    <ApolloProvider client={client}>
      <MainPage/>
    </ApolloProvider>
  );
}

export default App;
