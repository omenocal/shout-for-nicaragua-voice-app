'use strict';

const Parser = require('rss-parser');
const parser = new Parser();

parser.parseURL('https://sosnicaraguareporte.com/')
  .then((feed) => {
    console.log(feed.title);

    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link)
    });
  });
