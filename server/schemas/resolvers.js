// schemas/resolvers.js
const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Assume a user is already authenticated and their id is in context
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      // Login logic here
    },
    addUser: async (parent, { username, email, password }) => {
      // User creation logic here
    },
    saveBook: async (parent, { bookId }, context) => {
      // Logic to save a book here
    },
    removeBook: async (parent, { bookId }, context) => {
      // Logic to remove a book here
    }
  }
};

module.exports = resolvers;
