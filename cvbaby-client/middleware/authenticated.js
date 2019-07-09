import { SubscriptionState } from '~/assets/js/util';
export default function({ store, redirect }) {
  const authenticated = store.state.cognito.authenticated;
  const subscriptionState =
    authenticated.signInUserSession.idToken.payload['custom:subscriptionState'];
  if (!authenticated) {
    redirect('/');
  } else if (subscriptionState === SubscriptionState.NOT_STARTED) {
    redirect('/payment');
  }
}
