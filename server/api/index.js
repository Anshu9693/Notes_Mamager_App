const app = require('../app');

// Vercel serverless handler for Express
module.exports = (req, res) => {
  return app(req, res);
};
