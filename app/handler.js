'use strict';

const _ = require('lodash');
const moment = require('moment-timezone');
const universalAnalytics = require('universal-analytics');

const config = require('./config');
const UserStorage = require('./userStorage');

const storage = new UserStorage();

const BASE_URL = 'https://s3.amazonaws.com/shoutfornicaragua';

const handler = {
  async LAUNCH() {
    moment.locale(this.getLocale().toLowerCase());

    registerGoogleAnalytics.call(this).event('Main flow', 'Session Start', { sc: 'start' });
    registerGoogleAnalytics.call(this).event('Main flow', 'Launch');

    const data = this.t('Data');
    const tribute = _.sample(this.t('Tributes'));
    tribute.date = moment(tribute.date).format(this.t('DateFormat'));
    tribute.total = _.size(data);

    if (tribute.gender === 'F') {
      tribute.genderOne = this.t('GenderFemaleOne');
      tribute.genderTwo = this.t('GenderFemaleTwo');
    } else {
      tribute.genderOne = this.t('GenderMaleOne');
      tribute.genderTwo = this.t('GenderMaleTwo');
    }

    let user = await storage.get(this.getUserId());
    user = user || { userId: this.getUserId() };

    if (user.index !== undefined) {
      tribute.day = user.index + 1;

      if (this.isGoogleAction()) {
        this
          .googleAction()
          .showSuggestionChips(this.t('SuggestionChips'));
      }

      this
        .setSessionAttribute('user', user)
        .setSessionAttribute('startTime', +new Date())
        .setSessionAttribute('speechOutput', this.t('ReturningUser.ask', tribute))
        .setSessionAttribute('repromptSpeech', this.t('ReturningUser.reprompt'))
        .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
    } else {
      user.index = 0;

      this
        .setSessionAttribute('user', user)
        .setSessionAttribute('startTime', +new Date())
        .setSessionAttribute('speechOutput', this.t('Launch.ask', tribute))
        .setSessionAttribute('repromptSpeech', this.t('Launch.reprompt'))
        .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
    }
  },
  ReasonIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'ReasonIntent');

    this
      .setSessionAttribute('speechOutput', this.t('Reason.ask'))
      .setSessionAttribute('repromptSpeech', this.t('Reason.reprompt'))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  NextIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'NextIntent');
    this.toIntent('dayRequest');
  },
  PreviousIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'PreviousIntent');
    this.toIntent('dayRequest', true);
  },
  RepeatIntent() {
    if (this.getSessionAttribute('speechOutput')) {
      registerGoogleAnalytics.call(this).event('Main flow', 'RepeatIntent');
      this.ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
    } else {
      registerGoogleAnalytics.call(this).event('Main flow', 'RepeatIntent at LaunchRequest');
      this.toIntent('LAUNCH');
    }
  },
  StartOverIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'StartOverIntent');
    this
      .setSessionAttribute('user.index', undefined)
      .toIntent('dayRequest');
  },
  HelpIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'HelpIntent');

    this
      .setSessionAttribute('speechOutput', this.t('Help.ask'))
      .setSessionAttribute('repromptSpeech', this.t('Help.reprompt'))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  Unhandled() {
    const intentName = this.getIntentName();

    if (this.isAlexaSkill()) {
      registerGoogleAnalytics.call(this).event('Main flow', intentName);
    } else {
      const query = (this.request().getRawText() || '').toLowerCase();
      registerGoogleAnalytics.call(this).event('Main flow', intentName, query);
    }

    this
      .setSessionAttribute('speechOutput', this.t('Unhandled.ask'))
      .setSessionAttribute('repromptSpeech', this.t('Unhandled.reprompt'))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  dayRequest(isPrevious) {
    moment.locale(this.getLocale().toLowerCase());

    registerGoogleAnalytics.call(this).event('Main flow', this.getIntentName());

    const data = this.t('Data');
    let dayOrdinal = this.getInput('dayOrdinal') || {};
    let day = this.getInput('day') || {};

    dayOrdinal = _.toLower(dayOrdinal.key);

    if (dayOrdinal === 'second') {
      day = 2;
    } else if (dayOrdinal) {
      day = parseInt(dayOrdinal, 10);
    } else {
      day = parseInt(day.key, 10);
    }

    if (day) {
      registerGoogleAnalytics.call(this).event('Main flow', 'Most requested day', day);
    }

    if (day && !data[day - 1]) {
      registerGoogleAnalytics.call(this).event('Main flow', 'Most requested invalid day', day);

      this
        .setSessionAttribute('speechOutput', this.t('NoData.ask', { day, total: _.size(data) }))
        .setSessionAttribute('repromptSpeech', this.t('NoData.reprompt'))
        .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
      return;
    }

    if (!day) {
      day = this.getSessionAttribute('user.index');

      if (day === undefined) {
        day = -1;
      }

      if (isPrevious) {
        day -= 1;

        if (day < 0) {
          day = _.size(data) - 1;
        }
      } else {
        day += 1;

        if (day >= _.size(data)) {
          day = 0;
        }
      }
    } else {
      day -= 1;
    }

    const item = data[_.size(data) - day - 1];
    item.title = this.t('FactTitle', { day: day + 1, date: moment(item.date).format(this.t('DateFormat')) });
    let facts;

    if (_.size(item.facts) === 1) {
      facts = _.head(item.facts);
    } else {
      const lastItem = _.last(item.facts).toLowerCase();
      let connectingWord;

      if (_.startsWith(lastItem, 'i')) {
        connectingWord = this.t('ConnectingWordE');
      } else {
        connectingWord = this.t('ConnectingWord');
      }

      facts = `${_.join(_.initial(item.facts), ', <break time="0.5s"/> ')}, ${connectingWord} ${lastItem}`;
    }

    registerGoogleAnalytics.call(this).event('Main flow', 'Most listened day', day + 1);

    const valuesInSpeech = {
      day: day + 1,
      date: moment(item.date).format(this.t('DateFormat')),
      facts,
    };

    const factsForCard = getFactsForCard(item.facts);
    console.log('item', item);

    if (this.isAlexaSkill()) {
      this
        .alexaSkill()
        .showStandardCard(item.title, factsForCard, {
          smallImageUrl: `${BASE_URL}/nicaraguaFlag_720x480.jpg`,
          largeImageUrl: `${BASE_URL}/nicaraguaFlag_1200x800.jpg`,
        });
    } else {
      this
        .googleAction()
        .showImageCard(item.title, `**${factsForCard}**`, `${BASE_URL}/nicaraguaFlag_720x480.jpg`)
        .showSuggestionChips(this.t('SuggestionChips'));
    }

    this.setSessionAttribute('user.index', day);

    if (data === _.size(data) - 1) {
      this.tell(this.t('LastFact.tell', valuesInSpeech));
      return;
    }

    let label;

    if (data === _.size(data) - 2) {
      label = 'LastFact';
    } else {
      label = 'Fact';
    }

    this
      .setSessionAttribute('speechOutput', this.t(`${label}.ask`, valuesInSpeech))
      .setSessionAttribute('repromptSpeech', this.t(`${label}.reprompt`))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  async StopIntent() {
    await storage.put(this.getSessionAttribute('user'));

    registerGoogleAnalytics.call(this).event('Main flow', 'StopIntent');
    endSession.call(this);

    this.tell(this.t('Exit'));
  },
  async END() {
    await storage.put(this.getSessionAttribute('user'));

    registerGoogleAnalytics.call(this).event('Main flow', 'SessionEnded');
    endSession.call(this);

    if (this.isGoogleAction()) {
      this.tell(this.t('Exit'));
    } else {
      this.respond();
    }
  },
};

function endSession() {
  const start = this.getSessionAttribute('startTime');
  registerGoogleAnalytics.call(this).event('Main flow', 'Session End', { sc: 'end' });

  if (start) {
    const elapsed = +new Date() - start;
    registerGoogleAnalytics.call(this).timing('Main flow', 'Session Duration', elapsed);

    console.log('Session Duration', elapsed);
  }
}

function getFactsForCard(facts) {
  let text = `- ${facts.join('\n- ')}`;

  const ALIAS_MAPPING = {
    '<sub alias="cenid">CENIDH</sub>': 'CENIDH',
    '<sub alias="cosep">COSEP</sub>': 'COSEP',
    '<sub alias="cu un">CUUN</sub>': 'CUUN',
    '<sub alias="ins">INSS</sub>': 'INSS',
    '<sub alias="m r s">MRS</sub>': 'MRS',
    '<sub alias="u nen">UNEN</sub>': 'UNEN',
    '<sub alias="uca">UCA</sub>': 'UCA',
    '<sub alias="upoli">UPOLI</sub>': 'UPOLI',
  };

  _.forEach(ALIAS_MAPPING, (value, key) => {
    text = text.split(key).join(value);
  });

  return text;
}

function registerGoogleAnalytics() {
  if (!this.googleAnalytics) {
    const userID = this.getUserId();
    const trackingCode = config.googleAnalytics.trackingCode;

    this.googleAnalytics = universalAnalytics(trackingCode, userID, { strictCidFormat: false });
  }

  this.googleAnalytics.set('ul', this.getLocale().toLowerCase());
  this.googleAnalytics.set('cd1', this.getType());

  // Check for supportedInterfaces
  if (this.hasScreenInterface()) {
    this.googleAnalytics.set('cd2', true);
  }

  if (this.hasAudioInterface()) {
    this.googleAnalytics.set('cd3', true);
  }

  if (this.hasVideoInterface()) {
    this.googleAnalytics.set('cd4', true);
  }

  return this.googleAnalytics;
}

module.exports = handler;
