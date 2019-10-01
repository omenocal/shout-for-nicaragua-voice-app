'use strict';

const resources = require('./languageResources');

module.exports = {
  allowedApplicationIds: ['amzn1.ask.skill.abfeb7db-5096-4038-b734-e7a375980a23', ''],
  i18n: {
    resources,
  },
  intentMap: {
    LaunchIntent: 'dayRequest',
    DateIntent: 'dayRequest',
    YesIntent: 'dayRequest',
    NoIntent: 'StopIntent',
    CancelIntent: 'StopIntent',
    'AMAZON.YesIntent': 'dayRequest',
    'AMAZON.NoIntent': 'StopIntent',
    'AMAZON.NextIntent': 'NextIntent',
    'AMAZON.PreviousIntent': 'PreviousIntent',
    'AMAZON.StartOverIntent': 'StartOverIntent',
    'AMAZON.RepeatIntent': 'RepeatIntent',
    'AMAZON.HelpIntent': 'HelpIntent',
    'AMAZON.StopIntent': 'StopIntent',
    'AMAZON.CancelIntent': 'StopIntent',
    'AMAZON.FallbackIntent': 'Unhandled',
    DefaultFallbackIntent: 'Unhandled',
  },
  logging: true,

  db: {
    DynamoDb: {
      awsConfig: {
        region: 'us-east-1',
      },
      tableName: 'ShoutForNicaragua',
    },
  },

  user: {
    metaData: {
      enabled: true,
    },
  },

  dashbot: {
    alexa: process.env.DASHBOT_ALEXA_KEY,
    google: process.env.DASHBOT_GOOGLE_KEY,
  },

  // CUSTOM
  googleAnalytics: {
    trackingCode: process.env.GOOGLE_ANALYTICS_KEY,
  },

  s3: {
    baseUrl: process.env.S3_BUCKET_URL,
  },
};
