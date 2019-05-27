import * as nconf from "nconf";
import { DynamoDB } from "../util";

nconf.file(`${__dirname}/config.json`);

const DYNAMODB_TABLE_USERS = nconf.get("DYNAMODB_TABLE_USERS");

/*
 *  Pre-signup hook to automatically confirm users.
 */
export function confirmUser(event, context, callback) {
  event.response.autoConfirmUser = true;
  callback(null, event);
}

/*
 *  Post-signup hook to create a user in DynamoDB.
 */
export function createUser(event, context, callback) {
  const email = event.request.userAttributes.email;
  const user = {
    time_created: Date.now(),
    time_updated: 0,
    name: "",
    title: "",
    skills: [],
    profile: "",
    employment: [],
    education: [],
    references: [],
    personal: {
      description: "",
      hobbies: []
    },
    contact: {
      email: email,
      phone: "",
      website: "",
      social: []
    }
  };

  return DynamoDB.put({
    TableName: DYNAMODB_TABLE_USERS,
    Item: user
  }).promise();
}
