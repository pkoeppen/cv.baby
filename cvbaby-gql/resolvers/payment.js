import braintree from 'braintree';
import { Cognito } from '../util';

const CVBABY_USER_POOL_ID = process.env.CVBABY_USER_POOL_ID;
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.PAYMENT_MERCHANT_ID,
  publicKey: process.env.PAYMENT_PUBLIC_KEY,
  privateKey: process.env.PAYMENT_PRIVATE_KEY
});

export async function getClientPaymentToken() {
  try {
    const token = await new Promise((resolve, reject) => {
      gateway.clientToken.generate({}, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.clientToken);
      });
    });
    return token;
  } catch (error) {
    return error;
  }
}

export async function startSubscription(
  userID,
  username,
  paymentMethodNonce,
  planID
) {
  try {
    // Create a new customer.
    // TODO - handle case in which customer signs up but card is
    // rejected, leaving an orphaned customer object with no cards.
    const customer = await new Promise((resolve, reject) => {
      gateway.customer.create(
        {
          id: userID,
          paymentMethodNonce
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result.success) {
            return reject(new Error(result.message));
          }
          resolve(result.customer);
        }
      );
    });
    const paymentMethods = customer.paymentMethods;
    if (!paymentMethods || !paymentMethods.length) {
      return new Error('![404] Payment method not found');
    }
    const paymentMethodToken = paymentMethods[0].token;
    // Create a new subscription.
    const subscription = await new Promise((resolve, reject) => {
      gateway.subscription.create(
        {
          paymentMethodToken,
          planId: planID
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result.success) {
            return reject(new Error(result.message));
          }
          resolve(result.subscription);
        }
      );
    });
    // Set 'custom:subscriptionState' attribute to '1'.
    await updateCognitoAttributes(username, {
      'custom:subscriptionState': '1',
      'custom:subscriptionID': subscription.id
    });
  } catch (error) {
    // Rollback.
    gateway.customer.delete(userID, (error, data) => {
      if (error || !data.success) {
        console.error('Error deleting customer:', error || data.message);
      }
    });
    gateway.subscription.cancel(userID, (error, data) => {
      if (error || !data.success) {
        console.error('Error cancelling subscription:', error || data.message);
      }
    });
    // TODO: Make this more accurate instead of matching by error message string
    return error.message ===
      'Payment method token payment instrument type is not accepted by this merchant account.'
      ? new Error(
          `![409] Payment method not accepted. Please try another card.`
        )
      : error;
  }
}

export async function getSubscription(username) {
  try {
    const cognitoUser = await getCognitoUser(username);
    const subscriptionID = cognitoUser.UserAttributes.find(
      ({ Name }) => Name === 'custom:subscriptionID'
    ).Value;
    const subscription = await new Promise((resolve, reject) => {
      gateway.subscription.find(subscriptionID, (error, subscription) => {
        if (error) {
          return reject(error);
        }
        resolve(subscription);
      });
    });
    return subscription;
  } catch (error) {
    console.error(
      'Error in getSubscription():',
      JSON.stringify(error, null, 2)
    );
    if (error.name === 'notFoundError') {
      return new Error(`![406] Subscription not found`);
    } else {
      return new Error(error.message);
    }
  }
}

export async function getDefaultPaymentMethod(userID) {
  const paymentMethods = await new Promise((resolve, reject) => {
    gateway.customer.find(userID, (error, result) => {
      if (error) {
        console.log('err:', JSON.stringify(error, null, 2));
        return reject(error);
      }
      resolve(result.paymentMethods);
    });
  });
  const defaultPaymentMethod = paymentMethods.find(method => method.default);
  return defaultPaymentMethod;
}

export async function updatePaymentMethod(userID, paymentMethodNonce) {
  const paymentMethod = await new Promise((resolve, reject) => {
    gateway.paymentMethod.create(
      {
        customerId: userID,
        paymentMethodNonce,
        options: {
          makeDefault: true
        }
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result.success) {
          return reject(new Error(result.message));
        }
        resolve(result.paymentMethod);
      }
    );
  });
  return paymentMethod;
}

export async function cancelSubscription(username) {
  // Get subscriptionID from Cognito user.
  const cognitoUser = await getCognitoUser(username);
  const subscriptionID = cognitoUser.UserAttributes.find(
    ({ Name }) => Name === 'custom:subscriptionID'
  ).Value;
  // Cancel the subscription.
  await new Promise((resolve, reject) => {
    gateway.subscription.cancel(subscriptionID, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.subscription);
    });
  });
  // Update cognito attributes.
  await updateCognitoAttributes(username, { 'custom:subscriptionState': '2' });
  return true;
}

export async function renewSubscription() {
  //
  // TODO
  // create new subscription
  // update cognito user custom:subscriptionID and custom:subscriptionState = 1
}

function getCognitoUser(username) {
  return new Promise((resolve, reject) => {
    Cognito.adminGetUser(
      {
        UserPoolId: CVBABY_USER_POOL_ID,
        Username: username
      },
      (error, data) => (error ? reject(error) : resolve(data))
    );
  });
}

function updateCognitoAttributes(username, attributes) {
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
        Username: username
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}
