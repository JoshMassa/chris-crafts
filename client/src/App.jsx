import { useState } from 'react'
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { Outlet } from 'react-router-dom';
import Auth from './utils/auth';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Outlet />
    </ApolloProvider>
  )
}

export default App;
