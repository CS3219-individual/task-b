const app = require('./index.js');

const serverless = require('serverless-http');

module.exports.handler = serverless(app);