'use strict';

const facts = require('../data/factsES');
const tributes = require('../data/tributesES');

module.exports = {
  es: {
    translation: {
      Launch: {
        ask: 'Bienvenido, y gracias por tu interés en la situación actual de Nicaragua. <break time="0.5s"/> Quiero hablar ' +
          'en nombre de {{name}}, un {{category}} de {{age}} años de edad, quien perdió su vida el {{date}}, en {{city}}. ' +
          '<break time="0.5s"/> Los nicaragüenses {{genderOne}} consideran un héroe, porque murió defendiendo el país. ' +
          '<break time="0.5s"/> Después de este pequeño tributo a su memoria, permíteme decirte lo que puedo hacer. ' +
          '<break time="0.5s"/> Me puedes preguntar acerca de lo que acontecido en un día específico en esta revolución ' +
          'nicaragüense, desde el día 1 hasta el día {{total}}. <break time="0.5s"/> Puedes decir por ejemplo: qué sucedió ' +
          'el día 1. O, dime acerca del día 10. <break time="0.5s"/> Y te diré los sucesos que acontecieron ese día. ' +
          '<break time="0.5s"/> Si quieres saber acerca de esta revolución, solo dime: por qué está pasando esto. ' +
          '<break time="0.5s"/> Entonces, dime, ¿acerca de qué día te gustaría saber?',
        reprompt: '¿Acerca de qué día te gustaría saber?',
      },

      ReturningUser: {
        ask: 'Bienvenido de nuevo. <break time="0.5s"/> Esta vez, quiero hablar en nombre de {{name}}, un {{category}} de ' +
          '{{age}} años de edad, quien perdió su vida el {{date}}, en {{city}}. <break time="0.5s"/> Los nicaragüenses ' +
          '{{genderOne}} consideran un héroe, porque murió defendiendo el país. <break time="0.5s"/> Después de este ' +
          'pequeño tributo a su memoria, déjame decirte, que el último día que escuchaste fue el día número {{day}}. ' +
          '¿Te gustaría saber acerca del siguiente día?',
        reprompt: '¿Te gustaría saber acerca del siguiente día?',
      },

      Fact: {
        ask: 'Día {{day}}. <break time="0.5s"/> En el {{date}}: {{facts}} <break time="0.5s"/> ¿Te gustaría saber acerca del siguiente día?',
        reprompt: '¿Te gustaría saber acerca del siguiente día?',
      },

      LastFact: {
        tell: 'Último día. <break time="0.5s"/> El {{day}}: {{facts}}. <break time="0.5s"/> Gracias por escuchar estos hechos, vuelve pronto!',
        ask: 'Día {{day}}. <break time="0.5s"/> El {{date}}: {{facts}}. <break time="0.5s"/> ¿Te gustaría saber acerca del último día?',
        reprompt: '¿Te gustaría saber acerca del último día?',
      },

      Reason: {
        ask: 'Claro, permíteme contarte como empezó todo esto: el 16 de abril de 2018, manifestantes marcharon en la ' +
          'capital, Managua, para protestar contra lo que consideraban una respuesta insuficiente del gobierno a los ' +
          'incendios forestales que quemaron 5,500 hectáreas de la Reserva Biológica Indio Maíz, una reserva natural ' +
          'tropical que es hogar de Ramas y los indígenas Kriol, así como especies importantes de biodiversidad y en ' +
          'peligro de extinción. Las contra-protestas apoyaron al gobierno del Frente Sandinista. El miércoles 18 de ' +
          'abril, las protestas en la capital se expandieron en respuesta al anuncio del gobierno de Ortega-Murillo de ' +
          'reformas de la seguridad social que aumentaron los impuestos a la nómina y los ingresos al tiempo que reducían ' +
          'las pensiones en un 5%. Las manifestaciones también surgieron en seis ciudades más, y se encontraron con una ' +
          'fuerte respuesta de las autoridades tras el despliegue del ejército nicaragüense para responder a los ' +
          'manifestantes ordenados por el presidente Ortega. Al menos 26 personas murieron, incluido el periodista Ángel ' +
          'Gahona, del programa de noticias Meridiano, y Gahona fue asesinado a tiros fuera del ayuntamiento de Bluefields ' +
          'mientras transmitía en vivo en Facebook. También surgieron informes que varios medios independientes fueron ' +
          'censurados durante las protestas. Así es como todo comenzó. Entonces, dime, ¿acerca de qué día te gustaría saber?',
        reprompt: '¿Acerca de qué día te gustaría saber?',
      },

      NoData: {
        ask: 'No tengo ninguna información acerca del día {{day}}. Pero puedo decirte cualquier información de los ' +
          'primeros {{total}} días. ¿Acerca de qué día te gustaría saber?',
        reprompt: '¿Acerca de qué día te gustaría saber?',
      },

      Help: {
        ask: 'Puedo explicarte día a día lo que está sucediendo en la revolución Nicaragüense contra Daniel Ortega. ' +
          'Sólo tienes que preguntarme acerca de un día específico en este histórico movimiento, y puedo decirte los sucesos ' +
          'de ese día. También puedes decir: por qué está pasando esto, y puedo explicarte las causas de esta insurrección. ' +
          'Entonces, dime, acerca de qué día te gustaría saber?',
        reprompt: '¿Acerca de qué día te gustaría saber?',
      },

      Unhandled: {
        ask: 'Disculpa, no entendí lo que acabas de decir, ¿puedes decirlo de nuevo?',
        reprompt: '¿Qué acabas de decir?',
      },

      Exit: 'Adiós, y gracias por venir.',

      SuggestionChips: [
        'si',
        'no',
      ],

      GenderFemaleOne: 'la',
      GenderFemaleTwo: 'su',

      GenderMaleOne: 'lo',
      GenderMaleTwo: 'su',

      DateFormat: 'dddd, D [de] MMMM, [del] YYYY',
      FactTitle: 'Día {{day}}',

      ConnectingWord: 'y',
      ConnectingWordE: 'e',

      Tributes: tributes,

      Data: facts,
    },
  },
};
