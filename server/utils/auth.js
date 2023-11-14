// utils/auth.js
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh'; // Replace with your secret
const expiration = '2h';

module.exports = {
  authMiddleware: function (context) {
    // Extracting req from context, which is provided in GraphQL setup
    const req = context.req || context.request;

    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // In GraphQL, we don't necessarily want to return a response, so we just return the context
      return context;
    }

    try {
      // Verifying the token
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Adding the user data to the context
      context.user = data;
    } catch {
      console.log('Invalid token');
      // Here too, just return the context
    }

    return context;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
