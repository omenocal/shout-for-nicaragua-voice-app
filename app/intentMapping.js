'use strict';

module.exports = {
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
};
