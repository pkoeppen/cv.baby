import braintree from 'braintree';
import { Cognito } from '../util';

const CVBABY_USER_POOL_ID = process.env.CVBABY_USER_POOL_ID;
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.PAYMENT_MERCHANT_ID,
  publicKey: process.env.PAYMENT_PUBLIC_KEY,
  privateKey: process.env.PAYMENT_PRIVATE_KEY
});

export function getClientPaymentToken() {
  try {
    const token = new Promise((resolve, reject) => {
      gateway.clientToken.generate({}, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response.clientToken);
      });
    });
    return token;
  } catch (error) {
    return new Error(error);
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
    await new Promise((resolve, reject) => {
      gateway.subscription.create(
        {
          id: userID,
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
          resolve();
        }
      );
    });
    // Set 'custom:trialStarted' attribute to '1'.
    await new Promise((resolve, reject) => {
      Cognito.adminUpdateUserAttributes(
        {
          UserAttributes: [
            {
              Name: 'custom:trialStarted',
              Value: '1'
            }
          ],
          UserPoolId: CVBABY_USER_POOL_ID,
          Username: username
        },
        (error, data) => (error ? reject(error) : resolve(data))
      );
    });
  } catch (error) {
    // Rollback.
    gateway.customer.delete(userID);
    return error.message ===
      'Payment method token payment instrument type is not accepted by this merchant account.'
      ? new Error(
          `![409] Payment method not accepted. Please try another card.`
        )
      : error;
  }
}

export async function getSubscription(userID) {
  try {
    const subscription = await new Promise((resolve, reject) => {
      gateway.subscription.find(userID, (error, subscription) => {
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
