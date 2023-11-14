// server.js or where you initialize Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes'); // Commented out as no longer needed for GraphQL setup

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }), // Pass the middleware function with context
});

// Apply Apollo GraphQL middleware and set the path to /graphql
server.applyMiddleware({ app, path: '/graphql' });

// Commented out the RESTful routes setup as Apollo Server will handle the API routes
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
