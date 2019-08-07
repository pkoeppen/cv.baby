import {
  ResumeQuery,
  ResumesQuery,
  AnalyticsQuery,
  SubscriptionQuery,
  CheckSlugAvailableQuery,
  SaveResumeMutation,
  RemoveResumeMutation,
  StartSubscriptionMutation,
  CancelSubscriptionMutation,
  RenewSubscriptionMutation,
  UpdatePaymentMethodMutation,
  DefaultPaymentMethodQuery
} from '~/assets/js/queries';

export const state = () => ({
  authenticating: false,
  authenticated: null
});

export const actions = {
  getResume(context, { slug, isAuthorized, submitAnalyticsEvent }) {
    return this.$axios
      .post(`/${isAuthorized ? 'private' : 'public'}`, {
        query: ResumeQuery,
        vars: { slug, submitAnalyticsEvent }
      })
      .then(({ data }) => data.getResume);
  },
  getResumes() {
    return this.$axios
      .post('/private', {
        query: ResumesQuery
      })
      .then(({ data }) => data.getResumes);
  },
  getAnalytics() {
    return this.$axios
      .post('/private', {
        query: AnalyticsQuery
      })
      .then(({ data }) => data.getAnalytics);
  },
  getSubscription() {
    return this.$axios
      .post('/private', {
        query: SubscriptionQuery
      })
      .then(({ data }) => data.getSubscription);
  },
  getDefaultPaymentMethod() {
    return this.$axios
      .post('/private', {
        query: DefaultPaymentMethodQuery
      })
      .then(({ data }) => data.getDefaultPaymentMethod);
  },
  startSubscription(context, { nonce, planID }) {
    return this.$axios
      .post('/private', {
        query: StartSubscriptionMutation,
        vars: {
          paymentMethodNonce: nonce,
          planID
        }
      })
      .then(({ data }) => data.startSubscription);
  },
  cancelSubscription() {
    return this.$axios
      .post('/private', {
        query: CancelSubscriptionMutation
      })
      .then(({ data }) => data.cancelSubscription);
  },
  renewSubscription() {
    return this.$axios
      .post('/private', {
        query: RenewSubscriptionMutation
      })
      .then(({ data }) => data.renewSubscription);
  },
  updatePaymentMethod(context, nonce) {
    return this.$axios
      .post('/private', {
        query: UpdatePaymentMethodMutation,
        vars: { paymentMethodNonce: nonce }
      })
      .then(({ data }) => data.updatePaymentMethod);
  },
  checkSlugAvailable(context, slug) {
    return this.$axios
      .post('/private', {
        query: CheckSlugAvailableQuery,
        vars: { slug }
      })
      .then(({ data }) => data.checkSlugAvailable);
  },
  saveResume(context, { resume, base64Image }) {
    return this.$axios
      .post('/private', {
        query: SaveResumeMutation,
        vars: {
          resume,
          base64Image
        }
      })
      .then(({ data }) => data.saveResume);
  },
  removeResume(context, resumeID) {
    return this.$axios
      .post('/private', {
        query: RemoveResumeMutation,
        vars: { resumeID }
      })
      .then(({ data }) => data.removeResume);
  }
};

export const mutations = {
  setAuthenticating(_state, authenticating) {
    // eslint-disable-next-line no-param-reassign
    _state.authenticating = authenticating;
  }
};
