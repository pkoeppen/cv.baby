import { Cognito } from './util';

/*
 *  Pre-signup hook to automatically confirm users.
 */
export function confirmUser(event, context, callback) {
  //event.response.autoConfirmUser = true;
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
        callback(error);
      } else {
        callback(null, event);
      }
    }
  );
}
