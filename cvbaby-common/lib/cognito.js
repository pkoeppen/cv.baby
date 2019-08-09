import { createLogger } from './logger';
import { Cognito } from './aws';

const logger = createLogger('cognito');
const CVBABY_USER_POOL_ID = process.env.CVBABY_USER_POOL_ID;

export function getCognitoUser(email) {
  logger.debug(`Getting Cognito user '${email}'`, {
    fn: 'getCognitoUser'
  });
  return new Promise((resolve, reject) => {
    Cognito.adminGetUser(
      {
        UserPoolId: CVBABY_USER_POOL_ID,
        Username: email
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          // Add convenience methods.
          const cognitoUser = data;
          cognitoUser.getSubscriptionID = () => {
            return cognitoUser.UserAttributes.find(
              ({ Name }) => Name === 'custom:subscriptionID'
            ).Value;
          };
          cognitoUser.getSubscriptionState = () => {
            return cognitoUser.UserAttributes.find(
              ({ Name }) => Name === 'custom:subscriptionState'
            ).Value;
          };
          resolve(cognitoUser);
        }
      }
    );
  }).catch(error => {
    logger.error(error, { fn: 'getCognitoUser' });
  });
}

export function updateCognitoAttributes(email, attributes) {
  logger.info(`Updating Cognito attributes on user '${email}'`, {
    fn: 'updateCognitoAttributes'
  });
  return new Promise((resolve, reject) => {
    const updates = Object.keys(attributes).map(key => {
      return {
        Name: key,
        Value: attributes[key]
      };
    });
    Cognito.adminUpdateUserAttributes(
      {
        UserAttributes: updates,
        UserPoolId: CVBABY_USER_POOL_ID,
        Username: email
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  }).catch(error => {
    logger.error(error, { fn: 'updateCognitoAttributes' });
  });
}
