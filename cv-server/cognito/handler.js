import * as uuid from 'uuid/v1';
import { DynamoDB } from '../util';

const CVBABY_TABLE_USERS = process.env.CVBABY_TABLE_USERS;
const AccountStatus = {
  PRETRIAL: 'pretrial',
  TRIAL: 'trial',
  LICENSED: 'licensed'
};

/*
 *  Pre-signup hook to automatically confirm users.
 */
export function confirmUser(event, context, callback) {
  event.response.autoConfirmUser = true;
  callback(null, event);
}

/*
 *  Post-confirmation hook to create a user in DynamoDB.
 */
export function createUser(event, context, callback) {
  const _id = event.userName;
  const email = event.request.userAttributes.email;
  const user = {
    _id: _id,
    time_created: Date.now(),
    time_updated: 0,
    account_status: AccountStatus.PRETRIAL,
    name: null,
    title: null,
    profile: null,
    skills: [],
    employment: [],
    education: [],
    references: [],
    personal: {
      description: null,
      hobbies: []
    },
    contact: {
      email: email,
      phone: null,
      website: null,
      social: []
    }
  };

  DynamoDB.put({
    TableName: CVBABY_TABLE_USERS,
    Item: user
  }).promise()
  .then(() => callback(null, event))
  .catch(error => callback(error));
}
