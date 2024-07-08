import { useState } from 'react'
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Auth from './utils/auth';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import Events from './components/Events';

const httpLink = createHttpLink({
  uri: 'https://chris-crafts.onrender.com' || 'http://localhost:3000/graphql'
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

const { Content } = Layout;

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Layout style={{ minHeight: '100vh' }}>
        <Events />
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
