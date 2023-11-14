// src/App.jsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import YourRootComponent from './YourRootComponent';

function App() {
  return (
    <ApolloProvider client={client}>
      <YourRootComponent />
    </ApolloProvider>
  );
}

export default App;
