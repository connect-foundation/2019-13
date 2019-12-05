import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: 'http://localhost:4000',
  headers: localStorage.getItem('token') ? {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  } : {},
});
