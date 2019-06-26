import { DynamoDB } from '../util';

const CVBABY_TABLE_USERS = process.env.CVBABY_TABLE_USERS;

export function getUser(userID) {
  // Fetch a user from the database.
  return DynamoDB.get({
    TableName: CVBABY_TABLE_USERS,
    Key: { userID }
  })
    .promise()
    .then(({ Item }) => Item);
}
