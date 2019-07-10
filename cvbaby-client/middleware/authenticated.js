import { SubscriptionState } from '~/assets/js/util';
export default function({ store, redirect, app }) {
  const authenticated = store.state.cognito.authenticated;
  const subscriptionState =
    authenticated.signInUserSession.idToken.payload['custom:subscriptionState'];
  if (!authenticated) {
    redirect(app.localePath('index'));
  } else if (
    !subscriptionState ||
    subscriptionState === SubscriptionState.NOT_STARTED
  ) {
    redirect(
      app.localePath({
        name: 'payment',
        query: { cycle: 'yearly' }
      })
    );
  }
}
