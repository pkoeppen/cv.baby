import braintree from 'braintree';

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

export async function startSubscription(userID, paymentMethodNonce, planID) {
  try {
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
    const success = await new Promise((resolve, reject) => {
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
          resolve(true);
        }
      );
    });
    return success;
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
    if (error.message === 'Unexpected HTTP response: 406') {
      return new Error(`![406] Subscription not found`);
    } else {
      return new Error(error);
    }
  }
}
