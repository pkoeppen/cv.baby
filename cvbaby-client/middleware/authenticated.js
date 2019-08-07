import { SubscriptionState } from '~/assets/js/util';
export default function({ store, redirect, app }) {
  const authenticated = store.state.cognito.authenticated;
  if (!authenticated) {
    redirect(app.localePath('index'));
  } else {
    const subscriptionState = // eslint-disable-next-line
      authenticated.signInUserSession.idToken.payload[
        'custom:subscriptionState'
      ];
    if (
      !subscriptionState ||
      subscriptionState === SubscriptionState.NOT_STARTED
    ) {
      redirect(
        app.localePath({
          name: 'pricing'
        })
      );
    }
  }
}
