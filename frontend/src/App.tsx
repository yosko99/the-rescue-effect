import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import MainPage from './views/MainPage';
import RegisterPage from './views/RegisterPage';

function App () {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: '/graphql'
  });

  return (
    <Router>
      <ApolloProvider client={client}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
