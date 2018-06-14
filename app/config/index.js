'use strict';

const config = require('./config');
const configExample = require('./config.example');

let projectConfig;

if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
  projectConfig = config;
} else {
  projectConfig = configExample;
}

console.log('projectConfig', projectConfig);

module.exports = projectConfig;
