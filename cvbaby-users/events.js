import { Cognito, DynamoDB } from './util';

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
  // Set custom attribute 'custom:subscriptionState' to '0'.
  // This will be set to '1' when the user starts their subscription.
  Cognito.adminUpdateUserAttributes(
    {
      UserAttributes: [
        {
          Name: 'custom:subscriptionState',
          Value: '0'
        }
      ],
      UserPoolId: event.userPoolId,
      Username: event.userName
    },
    error => {
      if (error) {
        return callback(error);
      }

      const userID = event.request.userAttributes.sub;
      const user = {
        userID,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        resumes: []
      };

      DynamoDB.put({
        TableName: CVBABY_TABLE_USERS,
        Item: user
      })
        .promise()
        .then(() => callback(null, event))
        .catch(error => callback(error));
    }
  );
}
