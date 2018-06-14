'use strict';

const AWS = require('aws-sdk');

const config = require('./config');

AWS.config.update({ region: 'us-east-1' });

class UserStorage {
  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient();

    this.userTable = config.db.tableName;
    console.log('this.userTable: %s', this.userTable);
  }

  get(userId) {
    return this.client.get({
      TableName: this.userTable,
      Key: { userId },
    }).promise()
      .then(item => item.Item);
  }

  put(data) {
    return this.client.put({
      TableName: this.userTable,
      Item: data,
    }).promise();
  }
}

module.exports = UserStorage;
