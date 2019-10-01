'use strict';

const _ = require('lodash');
const moment = require('moment-timezone');
const universalAnalytics = require('universal-analytics');

const handler = {
  ON_HEALTH_CHECK() {
    return this.tell(this.t('HealthCheck'));
  },

  LAUNCH() {
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

    if (this.$user.$data.index !== undefined) {
      tribute.day = this.$user.$data.index + 1;

      if (this.isGoogleAction()) {
        this.$googleAction.showSuggestionChips(this.t('SuggestionChips'));
      }

      return this
        .setSessionAttribute('startTime', +new Date())
        .setSessionAttribute('speechOutput', this.t('ReturningUser.ask', tribute))
        .setSessionAttribute('repromptSpeech', this.t('ReturningUser.reprompt'))
        .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
    }

    this.$user.$data.index = 0;

    return this
      .setSessionAttribute('startTime', +new Date())
      .setSessionAttribute('speechOutput', this.t('Launch.ask', tribute))
      .setSessionAttribute('repromptSpeech', this.t('Launch.reprompt'))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  CAN_FULFILL_INTENT() {
    console.log(this.getHandlerPath());

    if (this.getIntentName() === 'dayRequest') {
      const day = this.getInput('day');
      const dayOrdinal = this.getInput('dayOrdinal');

      const canUnderstandSlot = 'YES';
      const canFulfillSlot = 'YES';

      if (day) {
        this.canFulfillSlot('day', canUnderstandSlot, canFulfillSlot);
      } else if (dayOrdinal) {
        this.canFulfillSlot('dayOrdinal', canUnderstandSlot, canFulfillSlot);
      }
    }

    return this.canFulfillRequest();
  },
  ReasonIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'ReasonIntent');

    return this
      .setSessionAttribute('speechOutput', this.t('Reason.ask'))
      .setSessionAttribute('repromptSpeech', this.t('Reason.reprompt'))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  NextIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'NextIntent');

    return this.toIntent('dayRequest');
  },
  PreviousIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'PreviousIntent');

    this.$data.isPrevious = true;

    return this.toIntent('dayRequest');
  },
  RepeatIntent() {
    if (this.getSessionAttribute('speechOutput')) {
      registerGoogleAnalytics.call(this).event('Main flow', 'RepeatIntent');

      return this.ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
    }

    registerGoogleAnalytics.call(this).event('Main flow', 'RepeatIntent at LaunchRequest');

    return this.toIntent('LAUNCH');
  },
  StartOverIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'StartOverIntent');

    delete this.$user.$data.index;

    return this.toIntent('dayRequest');
  },
  HelpIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'HelpIntent');

    return this
      .setSessionAttribute('speechOutput', this.t('Help.ask'))
      .setSessionAttribute('repromptSpeech', this.t('Help.reprompt'))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  Unhandled() {
    const intentName = this.getIntentName();

    if (this.isAlexaSkill()) {
      registerGoogleAnalytics.call(this).event('Main flow', intentName);
    } else {
      const query = (this.$googleAction.getRawText() || '').toLowerCase();
      registerGoogleAnalytics.call(this).event('Main flow', intentName, query);
    }

    return this
      .setSessionAttribute('speechOutput', this.t('Unhandled.ask'))
      .setSessionAttribute('repromptSpeech', this.t('Unhandled.reprompt'))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  dayRequest() {
    const { isPrevious } = this.$data;
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

      return this
        .setSessionAttribute('speechOutput', this.t('NoData.ask', { day, total: _.size(data) }))
        .setSessionAttribute('repromptSpeech', this.t('NoData.reprompt'))
        .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
    }

    if (!day) {
      day = this.$user.$data.index;

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

      facts = `${_.join(_.initial(item.facts), ' <break time="0.5s"/> ')}, ${connectingWord} ${lastItem}`;
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
      this.$alexaSkill
        .showStandardCard(item.title, factsForCard, {
          smallImageUrl: `${this.$app.$config.s3.baseUrl}/nicaraguaFlag_720x480.jpg`,
          largeImageUrl: `${this.$app.$config.s3.baseUrl}/nicaraguaFlag_1200x800.jpg`,
        });
    } else {
      this.$googleAction
        .showImageCard(item.title, `**${factsForCard}**`, `${this.$app.$config.s3.baseUrl}/nicaraguaFlag_720x480.jpg`)
        .showSuggestionChips(this.t('SuggestionChips'));
    }

    this.$user.$data.index = day;

    if (data === _.size(data) - 1) {
      return this.tell(this.t('LastFact.tell', valuesInSpeech));
    }

    let label;

    if (data === _.size(data) - 2) {
      label = 'LastFact';
    } else {
      label = 'Fact';
    }

    return this
      .setSessionAttribute('speechOutput', this.t(`${label}.ask`, valuesInSpeech))
      .setSessionAttribute('repromptSpeech', this.t(`${label}.reprompt`))
      .ask(this.getSessionAttribute('speechOutput'), this.getSessionAttribute('repromptSpeech'));
  },
  StopIntent() {
    registerGoogleAnalytics.call(this).event('Main flow', 'StopIntent');
    endSession.call(this);

    return this.tell(this.t('Exit'));
  },
  END() {
    registerGoogleAnalytics.call(this).event('Main flow', 'SessionEnded');
    endSession.call(this);

    if (this.isGoogleAction()) {
      return this.tell(this.t('Exit'));
    }

    return this;
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
    '<sub alias="A N P D H">ANPDH</sub>': 'ANPDH',
    '<sub alias="cenid">CENIDH</sub>': 'CENIDH',
    '<sub alias="cosep">COSEP</sub>': 'COSEP',
    '<sub alias="cu un">CUUN</sub>': 'CUUN',
    '<sub alias="ins">INSS</sub>': 'INSS',
    '<sub alias="m r s">MRS</sub>': 'MRS',
    '<sub alias="u nen">UNEN</sub>': 'UNEN',
    '<sub alias="uca">UCA</sub>': 'UCA',
    '<sub alias="upoli">UPOLI</sub>': 'UPOLI',
    '<sub alias="I A C H R">IACHR</sub>': 'IACHR',
  };

  _.forEach(ALIAS_MAPPING, (value, key) => {
    text = text.split(key).join(value);
  });

  return text;
}

function registerGoogleAnalytics() {
  if (!this.googleAnalytics) {
    const userID = this.getUserId();
    const { trackingCode } = this.$app.$config.googleAnalytics;

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
