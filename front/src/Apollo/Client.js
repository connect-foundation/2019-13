import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
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
