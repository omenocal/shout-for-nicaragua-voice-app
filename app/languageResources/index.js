'use strict';

const _ = require('lodash');

const responsesEN = require('./responsesEN');
const responsesES = require('./responsesES');

const views = _.merge(
  responsesEN,
  responsesES,
);

module.exports = views;
