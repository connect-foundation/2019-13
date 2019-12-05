import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  headers: localStorage.getItem('token') ? {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  } : {},
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
