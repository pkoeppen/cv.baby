import {
  createLogger,
  getCognitoUser,
  updateCognitoAttributes,
  generateBraintreeClientPaymentToken,
  getBraintreeCustomer,
  createBraintreeCustomer,
  deleteBraintreeCustomer,
  getBraintreeSubscription,
  createBraintreeSubscription,
  updateBraintreeSubscription,
  cancelBraintreeSubscription,
  createBraintreePaymentMethod
} from '../../cvbaby-common';

const logger = createLogger('cvbaby-gql');

export async function getClientPaymentToken() {
  try {
    const token = await generateBraintreeClientPaymentToken();
    return token;
  } catch (error) {
    return new Error('![500] Error generating client payment token');
  }
}

export async function startSubscription(
  userID,
  email,
  paymentMethodNonce,
  planID
) {
  logger.info(`Starting subscription for user with email '${email}'`, {
    fn: 'startSubscription'
  });
  try {
    // Create a new customer.
    // TODO - handle case in which customer signs up but card is
    // rejected, leaving an orphaned customer object with no cards.
    const customer = await createBraintreeCustomer(
      userID,
      email,
      paymentMethodNonce
    );
    // Ensure at least one payment method is present.
    const paymentMethods = customer.paymentMethods;
    if (!paymentMethods || !paymentMethods.length) {
      return new Error('![404] Payment method not found');
    }
    const paymentMethodToken = paymentMethods[0].token;
    // Create a new subscription.
    const subscription = await createBraintreeSubscription(
      paymentMethodToken,
      planID
    );
    // Set 'custom:subscriptionState' attribute to '1'.
    await updateCognitoAttributes(email, {
      'custom:subscriptionState': '1',
      'custom:subscriptionID': subscription.id
    });
  } catch (error) {
    // Rollback.
    logger.error(`Error starting subscription. Rolling back. ${error}`, {
      fn: 'startSubscription'
    });
    // Don't wait for delete to finish.
    deleteBraintreeCustomer(userID);
    // Customize error message.
    let message = '![500] Internal server error.';
    if (
      error.message ===
      'Payment method token payment instrument type is not accepted by this merchant account.'
    ) {
      message = '![409] Payment method not accepted. Please try another card.';
    }

    return new Error(message);
  }
}

export async function getSubscription(email) {
  logger.debug(`Getting subscription for user with email '${email}'`, {
    fn: 'getSubscription'
  });
  try {
    const cognitoUser = await getCognitoUser(email);
    const subscriptionID = cognitoUser.UserAttributes.find(
      ({ Name }) => Name === 'custom:subscriptionID'
    ).Value;
    const subscription = await getBraintreeSubscription(subscriptionID);
    return subscription;
  } catch (error) {
    // Customize error message.
    let message = '![500] Internal server error.';
    if (error.name === 'notFoundError') {
      message = '![406] Subscription not found.';
    }

    return new Error(message);
  }
}

export async function getDefaultPaymentMethod(userID) {
  logger.debug(`Getting default payment method for user '${userID}'`, {
    fn: 'getDefaultPaymentMethod'
  });
  try {
    const customer = await getBraintreeCustomer(userID);
    const paymentMethods = customer.paymentMethods;
    const defaultPaymentMethod = paymentMethods.find(method => method.default);
    return defaultPaymentMethod;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

export async function updatePaymentMethod(userID, email, paymentMethodNonce) {
  logger.info(`Updating payment method for user '${userID}'`, {
    fn: 'updatePaymentMethod'
  });
  try {
    // Create a new default payment method.
    const paymentMethod = await createBraintreePaymentMethod(
      userID,
      paymentMethodNonce
    );
    // Set subscription to use the new payment method.
    const cognitoUser = await getCognitoUser(email);
    const subscriptionID = cognitoUser.getSubscriptionID();
    await updateBraintreeSubscription(subscriptionID, {
      paymentMethodToken: paymentMethod.token
    });
    return paymentMethod;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

export async function cancelSubscription(email) {
  logger.info(`Canceling subscription for user with email '${email}'`, {
    fn: 'cancelSubscription'
  });
  try {
    // Get subscriptionID from Cognito user.
    const cognitoUser = await getCognitoUser(email);
    const subscriptionID = cognitoUser.UserAttributes.find(
      ({ Name }) => Name === 'custom:subscriptionID'
    ).Value;
    // Cancel the subscription.
    const subscription = await cancelBraintreeSubscription(subscriptionID);
    // Update Cognito attributes.
    await updateCognitoAttributes(email, {
      'custom:subscriptionState': '2'
    });
    return subscription;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

export async function renewSubscription(userID, email) {
  logger.info(`Renewing subscription for user with email '${email}'`, {
    fn: 'renewSubscription'
  });
  try {
    // Get token from the customer's default payment method.
    const customer = await getBraintreeCustomer(userID);
    const paymentMethods = customer.paymentMethods;
    const defaultPaymentMethod = paymentMethods.find(method => method.default);
    const paymentMethodToken = defaultPaymentMethod.token;
    // Get the last subscribed planID from the canceled subscription.
    const cognitoUser = await getCognitoUser(email);
    const oldSubscriptionID = cognitoUser.getSubscriptionID();
    const oldSubscription = await getBraintreeSubscription(oldSubscriptionID);
    const planID = oldSubscription.planId;
    // Create a new subscription.
    const newSubscription = await createBraintreeSubscription(
      paymentMethodToken,
      planID
    );
    const newSubscriptionID = newSubscription.id;
    // Update Cognito attributes.
    await updateCognitoAttributes(email, {
      'custom:subscriptionState': '1',
      'custom:subscriptionID': newSubscriptionID
    });
    return newSubscription;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}
