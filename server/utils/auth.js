// utils/auth.js
const jwt = require('jsonwebtoken');

// It's a best practice to store secret keys and expiration in environment variables
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh'; // Replace with your secret from environment variables
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // New: Destructure 'req' directly from the parameter to simplify the code
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      // Strip out 'Bearer ' from 'Bearer <token>'
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // Return context without user if no token found
      return { user: null };
    }

    try {
      // Decode and attach user data to the context
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      // Log the error and return context without user
      console.error('Invalid token');
      req.user = null;
    }

    // Return the request object so we can access the user in the resolver context
    return req;
  },

  signToken: function ({ username, email, _id }) {
    // Payload should contain user details necessary for your application
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
