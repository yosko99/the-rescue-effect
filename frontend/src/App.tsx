import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import AddForAdoptionTab from './views/profile_page_tabs/AddForAdoptionTab';
import ProfilePage from './views/ProfilePage';
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
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/add-for-adoption' element={<AddForAdoptionTab />} />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
