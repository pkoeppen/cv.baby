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
    const { customer } = await new Promise((resolve, reject) => {
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
          resolve(result);
        }
      );
    });
    const paymentMethods = customer.paymentMethods;
    if (!paymentMethods || !paymentMethods.length) {
      return new Error('![404] Payment method not found');
    }
    const paymentMethodToken = paymentMethods[0].token;
    // Create a new subscription.
    const { subscription } = await new Promise((resolve, reject) => {
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
          resolve(result);
        }
      );
    });
    // Set 'custom:subscriptionState' attribute to '1'.
    await new Promise((resolve, reject) => {
      Cognito.adminUpdateUserAttributes(
        {
          UserAttributes: [
            {
              Name: 'custom:subscriptionState',
              Value: '1'
            },
            {
              Name: 'custom:subscriptionID',
              Value: subscription.id
            }
          ],
          UserPoolId: CVBABY_USER_POOL_ID,
          Username: username
        },
        (error, data) => (error ? reject(error) : resolve(data))
      );
    });
  } catch (error) {
    console.error('Error in startSubscription():', error);
    // Rollback.
    gateway.customer.delete(userID, (error, data) => {
      if (error || !data.success) {
        console.error('Error deleting customer:', error || data.message);
      }
    });
    gateway.subscription.cancel(userID, (error, data) => {
      if (error || !data.success) {
        console.error('Error deleting customer:', error || data.message);
      }
    });
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
    const { UserAttributes } = await new Promise((resolve, reject) => {
      Cognito.adminGetUser(
        {
          UserPoolId: CVBABY_USER_POOL_ID,
          Username: username
        },
        (error, data) => (error ? reject(error) : resolve(data))
      );
    });
    const subscriptionID = UserAttributes.find(
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
