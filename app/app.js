'use strict';

const { App } = require('jovo-framework');

const config = require('./config');
const handler = require('./handler');
const intentMap = require('./intentMapping');
const resources = require('./languageResources');

// =================================================================================
// App Configuration
// =================================================================================

const jovoConfig = {
  intentMap,
  allowedApplicationIds: [
    config.alexaSkillId,
    config.googleActionId,
  ],
  i18n: {
    resources,
  },
  logging: true,
  analytics: {
    services: {
      DashbotAlexa: {
        key: config.dashbot.alexa,
      },
      DashbotGoogleAction: {
        key: config.dashbot.googleAssistant,
      },
    },
  },
};

const app = new App(jovoConfig);
app.setHandler(handler);

module.exports.app = app;
