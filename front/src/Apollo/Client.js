// import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'http://localhost:4000/',
    headers: localStorage.getItem('token') ? {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    } : {} }),
});

client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
  },
};

export default client;
