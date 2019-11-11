import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import App from './Components/App';
import Client from './Apollo/Client';

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
