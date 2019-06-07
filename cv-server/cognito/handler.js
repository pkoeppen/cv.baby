import { DynamoDB } from '../util';

const CVBABY_TABLE_USERS = process.env.CVBABY_TABLE_USERS;

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
  const userID = event.userName;
  const user = {
    userID: userID,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    resumes: []
  };

  // const resume = {
  //   alias: null,
  //   createdAt: new Date().toISOString(),
  //   updatedAt: null,
  //   name: null,
  //   title: null,
  //   email: null,
  //   phone: null,
  //   website: null,
  //   profile: null,
  //   description: null,
  //   skills: [],
  //   employment: [],
  //   education: [],
  //   references: [],
  //   hobbies: [],
  //   social: []
  // };

  DynamoDB.put({
    TableName: CVBABY_TABLE_USERS,
    Item: user
  })
    .promise()
    .then(() => callback(null, event))
    .catch(error => callback(error));
}
