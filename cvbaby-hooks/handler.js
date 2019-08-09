import * as qs from 'qs';
import {
  createLogger,
  updateCognitoAttributes,
  parseWebhookNotification,
  cancelBraintreeSubscription
} from '../cvbaby-common';

const logger = createLogger('cvbaby-hooks');

export const handlerBraintree = async function(event) {
  const { bt_signature, bt_payload } = qs.parse(event.body) || {};
  const webhookNotification = await parseWebhookNotification(
    bt_signature,
    bt_payload
  );

  const kind = webhookNotification.kind;
  const email = await webhookNotification.getCustomerEmail();
  const subscriptionID = webhookNotification.subscription.id;

  switch (kind) {
    case 'subscription_canceled':
      await endSubscription(email);
      break;
    case 'subscription_charged_unsuccessfully':
      await endSubscription(email, subscriptionID);
      break;
    case 'subscription_expired':
      await endSubscription(email, subscriptionID);
      break;
    case 'subscription_went_past_due':
      await endSubscription(email, subscriptionID);
      break;
    default:
      // TODO
      logger.info(`Hit default. Kind: '${kind}'`, {
        fn: 'handlerBraintree'
      });
  }
  return {
    headers: {
      'Access-Control-Allow-Origin': '*', // TODO: Change this
      'Access-Control-Allow-Credentials': true
    },
    statusCode: 200,
    body: 'Hello, Braintree'
  };
};

async function endSubscription(email, subscriptionID) {
  if (subscriptionID) {
    // Cancel subscription.
    await cancelBraintreeSubscription(subscriptionID);
  }
  // Update Cognito attributes.
  await updateCognitoAttributes(email, {
    'custom:subscriptionState': '2'
  });
}
