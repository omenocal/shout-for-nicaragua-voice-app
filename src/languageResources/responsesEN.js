'use strict';

const facts = require('../data/factsEN');
const tributes = require('../data/tributesEN');

module.exports = {
  en: {
    translation: {
      Launch: {
        ask: 'Welcome, and thanks for your interest about current Nicaragua\'s situation. I want to speak in the name of '
          + '{{name}}, a {{category}} of {{age}} years old, who was assesinated by Nicaragua\'s government on {{date}} in '
          + '{{city}}. Nicaraguans consider {{genderOne}} a hero, because he died defending the country. After this little tribute to '
          + '{{genderTwo}} memory, let me tell you what I can do. You can ask me about what happened in a specific day in this '
          + 'Nicaraguan revolution, from day 1 to day {{total}}. You can say for example: what happened on day 1. Or, tell me '
          + 'about day 10. And I will tell you the facts that happened that day. If you want to know about this pacific '
          + 'revolution, just say: why is this happening. So, tell me, what day would you like to know about?',
        reprompt: 'What day would you like to know about?',
      },

      ReturningUser: {
        ask: 'Welcome again, this time, I want to speak in the name of {{name}}, a {{category}} of {{age}} years old, '
          + 'who was assesinated by Nicaragua\'s government on {{date}} in {{city}}. Nicaraguans consider {{genderOne}} a '
          + 'hero, because he died defending the country. After this little tribute to {{genderTwo}} memory, let me tell you '
          + 'the last day you heard about was day number {{day}}. Would you like to know about the next day?',
        reprompt: 'Would you like to know about the next day?',
      },

      Fact: {
        ask: 'Day {{day}}. On {{date}}: {{facts}} <break time="0.5s"/> Would you like to know about the next day?',
        reprompt: 'Would you like to know about the next day?',
      },

      LastFact: {
        tell: 'Last day. Day {{day}}. On {{date}}: {{facts}}. Thanks for listening to these facts, come back soon!',
        ask: 'Day {{day}}. On {{date}}: {{facts}}. Would you like to know about the last fact?',
        reprompt: 'Would you like to know about the last fact?',
      },

      Reason: {
        ask: 'Sure, let me tell you why this started: on April 16th, 2018, demonstrators marched in the capital of Managua, '
          + 'to protest what they regarded as an insufficient government response to forest fires that burned 5,500 hectares '
          + 'of the Indio Maiz Biological Reserve, a tropical nature preserve that is home to Rama and Kriol indigenous people, '
          + 'as well as significant biodiversity and endangered species. Counter-protests supported the Sandinista Front '
          + 'government. On Wednesday, April 18th, protests in the capital expanded in response to the Ortega - Murillo '
          + 'administration announcement of social security reforms that raised income and payroll taxes while reducing '
          + 'pension benefits by 5%. Demonstrations also emerged in six more cities, meeting with heavy response from '
          + 'authorities following the deployment of the Nicaraguan Army to respond to protesters ordered by President '
          + 'Ortega. At least 26 people were killed, including journalist Angel Gahona of the news program Meridiano, '
          + 'with Gahona being shot to death outside of city hall in Bluefields while streaming on Facebook Live. Reports '
          + 'also emerged that various forms of independent media were censored during the protests. This is how everything '
          + 'started. So, tell me, what day would you like to know about?',
        reprompt: 'What day would you like to know about?',
      },

      NoData: {
        ask: 'I don\'t have any information about day {{day}}. But I can tell you any information about the first {{total}} days. '
          + 'What day would you like to know about?',
        reprompt: 'What day would you like to know about?',
      },

      Help: {
        ask: 'I can explain you day by day what is happening in the Nicaraguan revolution. You just need to ask me about a '
          + 'specific day in this historic movement, and I can tell you the facts about that day. You can also say: why is this '
          + 'happening, I can tell you the causes of this insurrection. So, tell me, what day would you like to know about?',
        reprompt: 'What day would you like to know about?',
      },

      Unhandled: {
        ask: 'Sorry, I didn\'t understand what you just said. Can you repeat it again?',
        reprompt: 'What did you just said?',
      },

      HealthCheck: 'Thanks for checking, everything is good!',
      Exit: 'Goodbye, thanks for reaching out.',

      SuggestionChips: [
        'yes',
        'no',
      ],

      GenderFemaleOne: 'her',
      GenderFemaleTwo: 'her',

      GenderMaleOne: 'him',
      GenderMaleTwo: 'his',

      DateFormat: 'dddd, MMMM Do, YYYY',
      FactTitle: 'Day {{day}}: {{date}}',

      ConnectingWord: 'and',

      Tributes: tributes,

      Data: facts,
    },
  },
};
