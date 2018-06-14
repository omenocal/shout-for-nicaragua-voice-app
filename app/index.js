'use strict';

const { Webhook } = require('jovo-framework');
const { app } = require('./app.js');

// =================================================================================
// Server Configuration
// =================================================================================

if (app.isWebhook()) {
  const port = process.env.PORT || 3000;
  Webhook.listen(port, () => {
    console.log(`Example server listening on port ${port}!`);
  });
  Webhook.post('/webhook', (req, res) => {
    app.handleWebhook(req, res);
  });
}

exports.handler = (event, context, callback) => {
  if (!event || (event && !event.result && !event.status && !event.session && !event.request)) {
    console.log('SCHEDULED EVENT');
    callback(null, 'SCHEDULED EVENT');
  } else {
    app.handleLambda(event, context, callback);
  }
};
