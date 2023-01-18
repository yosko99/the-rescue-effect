import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import Page404 from './views/Page404';
import AddForAdoptionTab from './views/profile_page_tabs/AddForAdoptionTab';
import MyAnimalsTab from './views/profile_page_tabs/MyAnimalsTab';
import ProfileTab from './views/profile_page_tabs/ProfileTab';
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
          <Route path='/profile' element={<ProfileTab />} />
          <Route path='/add-for-adoption' element={<AddForAdoptionTab />} />
          <Route path='/my-animals' element={<MyAnimalsTab />} />
          <Route path='/404' element={<Page404 />} />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
