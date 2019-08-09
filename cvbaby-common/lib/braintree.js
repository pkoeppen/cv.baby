import { createLogger } from './logger';
import braintree from 'braintree';

const logger = createLogger('braintree');
const braintreeEnv =
  process.env.NODE_ENV === 'production' ? 'Production' : 'Sandbox'; // TODO: Change all CVBABY_ENV to NODE_ENV

export const gateway = braintree.connect({
  environment: braintree.Environment[braintreeEnv],
  merchantId: process.env.PAYMENT_MERCHANT_ID,
  publicKey: process.env.PAYMENT_PUBLIC_KEY,
  privateKey: process.env.PAYMENT_PRIVATE_KEY
});

export async function generateBraintreeClientPaymentToken() {
  logger.debug(`Generating Braintree client payment token`, {
    fn: 'generateBraintreeClientPaymentToken'
  });
  return new Promise((resolve, reject) => {
    gateway.clientToken.generate({}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.clientToken);
      }
    });
  }).catch(error => {
    logger.error(error, { fn: 'generateBraintreeClientPaymentToken' });
    throw error;
  });
}

export function getBraintreeCustomer(customerID) {
  logger.debug(`Getting Braintree customer '${customerID}'`, {
    fn: 'getBraintreeCustomer'
  });
  return new Promise((resolve, reject) => {
    gateway.customer.find(customerID, (error, customer) => {
      if (error) {
        reject(error);
      } else {
        resolve(customer);
      }
    });
  }).catch(error => {
    logger.error(error, { fn: 'getBraintreeCustomer' });
    throw error;
  });
}

export function createBraintreeCustomer(userID, email, paymentMethodNonce) {
  logger.info(`Creating Braintree customer with email '${email}'`, {
    fn: 'createBraintreeCustomer'
  });
  return new Promise((resolve, reject) => {
    gateway.customer.create(
      {
        id: userID,
        email: username,
        paymentMethodNonce
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result.success) {
          reject(new Error(result.message));
        } else {
          resolve(result.customer);
        }
      }
    );
  }).catch(error => {
    logger.error(error, { fn: 'createBraintreeCustomer' });
    throw error;
  });
}

export function deleteBraintreeCustomer(customerID) {
  logger.info(`Deleting Braintree customer '${customerID}'`, {
    fn: 'cancelBraintreeSubscription'
  });
  return new Promise((resolve, reject) => {
    gateway.customer.delete(customerID, (error, response) => {
      if (error) {
        reject(error);
      } else if (!response.success) {
        reject(new Error(response.message));
      } else {
        resolve();
      }
    });
  }).catch(error => {
    logger.error(error, { fn: 'deleteBraintreeCustomer' });
    throw error;
  });
}

export function getBraintreeSubscription(subscriptionID) {
  logger.debug(`Getting Braintree subscription '${subscriptionID}'`, {
    fn: 'getBraintreeSubscription'
  });
  return new Promise((resolve, reject) => {
    gateway.subscription.find(subscriptionID, (error, subscription) => {
      if (error) {
        return reject(error);
      }
      resolve(subscription);
    });
  }).catch(error => {
    logger.error(error, { fn: 'getBraintreeSubscription' });
    throw error;
  });
}

export function getBraintreePaymentMethod(paymentMethodToken) {
  logger.debug(`Getting Braintree payment method '${paymentMethodToken}'`, {
    fn: 'getBraintreePaymentMethod'
  });
  return new Promise((resolve, reject) => {
    gateway.paymentMethod.find(paymentMethodToken, (error, paymentMethod) => {
      if (error) {
        reject(error);
      } else {
        resolve(paymentMethod);
      }
    });
  }).catch(error => {
    logger.error(error, { fn: 'getBraintreePaymentMethod' });
    throw error;
  });
}

export function createBraintreeSubscription(paymentMethodToken, planID) {
  logger.info(
    `Creating Braintree subscription with planID '${planID}' from token '${paymentMethodToken}'`,
    {
      fn: 'createBraintreeSubscription'
    }
  );
  return new Promise((resolve, reject) => {
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
  }).catch(error => {
    logger.error(error, { fn: 'createBraintreeSubscription' });
    throw error;
  });
}

export function cancelBraintreeSubscription(subscriptionID) {
  logger.info(`Canceling Braintree subscription '${subscriptionID}'`, {
    fn: 'cancelBraintreeSubscription'
  });
  return new Promise((resolve, reject) => {
    gateway.subscription.cancel(subscriptionID, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.subscription);
      }
    });
  }).catch(error => {
    logger.error(error, { fn: 'cancelBraintreeSubscription' });
    throw error;
  });
}

export function updateBraintreeSubscription(subscriptionID, updates) {
  logger.info(`Updating Braintree subscription '${subscriptionID}'`, {
    fn: 'updateBraintreeSubscription'
  });
  return new Promise((resolve, reject) => {
    gateway.subscription.update(subscriptionID, updates, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (!result.success) {
        return reject(new Error(result.message));
      }
      resolve(result.subscription);
    });
  }).catch(error => {
    logger.error(error, { fn: 'updateBraintreeSubscription' });
    throw error;
  });
}

export function createBraintreePaymentMethod(customerID, paymentMethodNonce) {
  logger.info(
    `Creating Braintree payment method for customer '${customerID}' and nonce '${paymentMethodNonce}'`,
    {
      fn: 'createBraintreePaymentMethod'
    }
  );
  return new Promise((resolve, reject) => {
    gateway.paymentMethod.create(
      {
        customerId: customerID,
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
  }).catch(error => {
    logger.error(error, { fn: 'createBraintreePaymentMethod' });
    throw error;
  });
}

export function parseWebhookNotification(bt_signature, bt_payload) {
  logger.debug(
    `Parsing Braintree webhook notification with signature '${bt_signature}'`,
    {
      fn: 'parseWebhookNotification'
    }
  );
  return new Promise((resolve, reject) => {
    gateway.webhookNotification.parse(
      bt_signature,
      bt_payload,
      (error, webhookNotification) => {
        if (error) {
          reject(error);
        } else {
          // Provide a customer email getter for convenience.
          webhookNotification.getCustomerEmail = async function() {
            const paymentMethodToken =
              webhookNotification.subscription.paymentMethodToken;
            const paymentMethod = await getBraintreePaymentMethod(
              paymentMethodToken
            );
            const customerID = paymentMethod.customerId;
            const customer = await getBraintreeCustomer(customerID);
            return customer.email;
          };
          resolve(webhookNotification);
        }
      }
    );
  }).catch(error => {
    logger.error(error, { fn: 'parseWebhookNotification' });
    throw error;
  });
}
