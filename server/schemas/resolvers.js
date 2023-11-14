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
      // Login logic here (make sure to include context.user check if necessary)
    },
    addUser: async (parent, { username, email, password }) => {
      // User creation logic here
    },
    saveBook: async (parent, { bookId }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to save a book');
      }
      // Logic to save a book for the authenticated user here
    },
    removeBook: async (parent, { bookId }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to remove a book');
      }
      // Logic to remove a book for the authenticated user here
    }
  }
};

module.exports = resolvers;
