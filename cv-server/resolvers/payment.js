import braintree from 'braintree';

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.PAYMENT_MERCHANT_ID,
  publicKey: process.env.PAYMENT_PUBLIC_KEY,
  privateKey: process.env.PAYMENT_PRIVATE_KEY
});

export function getClientPaymentToken() {
  return new Promise((resolve, reject) => {
    gateway.clientToken.generate({}, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.clientToken);
    });
  });
}

export async function startSubscription(
  principalId,
  paymentMethodNonce,
  planId
) {
  const customer = await new Promise((resolve, reject) => {
    gateway.customer.create(
      {
        id: principalId,
        paymentMethodNonce
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result.success) {
          return reject(result.message);
        }
        resolve(result.customer);
      }
    );
  });
  const paymentMethods = customer.paymentMethods;
  if (!paymentMethods || !paymentMethods.length) {
    throw new Error('![404] Payment method not found');
  }
  const paymentMethodToken = paymentMethods[0].token;
  return new Promise((resolve, reject) => {
    gateway.subscription.create(
      {
        id: principalId,
        paymentMethodToken,
        planId
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result.success) {
          return reject(result.message);
        }
        resolve(true);
      }
    );
  });
}

export async function getSubscription(principalId) {
  const subscription = await new Promise((resolve, reject) => {
    gateway.subscription.find(principalId, (error, subscription) => {
      if (error) {
        return reject(error);
      }
      resolve(subscription);
    });
  });
  return subscription;
}
