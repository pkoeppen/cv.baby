import { DynamoDB } from '../util';

const CVBABY_TABLE_USERS = process.env.CVBABY_TABLE_USERS;

export function getUser(principalId) {
  return DynamoDB.get({
    TableName: CVBABY_TABLE_USERS,
    Key: {
      userId: principalId
    }
  })
    .promise()
    .then(({ Item }) => Item);
}
