'use strict';

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { DynamoDb } = require('jovo-db-dynamodb');
const { JovoDebugger } = require('jovo-plugin-debugger');

const handler = require('./handler');

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new DynamoDb(),
  new JovoDebugger(),
);

app.hook('before.platform.output', (error, host, jovo) => {
  if (jovo.googleAnalytics) {
    jovo.googleAnalytics.send((err, count) => {
      if (err) {
        console.log('ERROR SENDING ANALYTICS', err);
      }

      console.log('ANALYTICS COUNT', count);
    });
  }
});

app.setHandler(handler);

module.exports.app = app;
