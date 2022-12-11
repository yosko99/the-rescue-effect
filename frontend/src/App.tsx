import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import MainPage from './views/MainPage';

function App () {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:5000/graphql'
  });

  return (
    <ApolloProvider client={client}>
      <MainPage/>
    </ApolloProvider>
  );
}

export default App;
