import {
  ResumeQuery,
  ResumesQuery,
  AnalyticsQuery,
  SubscriptionQuery,
  CheckSlugAvailableQuery,
  SaveResumeMutation,
  RemoveResumeMutation,
  AnalyticsMutation
} from '~/assets/js/queries';

export const state = () => ({
  authenticating: false,
  authenticated: null
});

export const actions = {
  getResume(context, slug) {
    return this.$axios
      .post('/gql/public', {
        query: ResumeQuery,
        vars: { slug }
      })
      .then(({ data }) => data.getResume);
  },
  getResumes() {
    return this.$axios
      .post('/gql/private', {
        query: ResumesQuery
      })
      .then(({ data }) => data.getResumes);
  },
  getAnalytics() {
    return this.$axios
      .post('/gql/private', {
        query: AnalyticsQuery
      })
      .then(({ data }) => data.getAnalytics);
  },
  submitAnalyticsEvent(context, ipAddress) {
    return this.$axios.post('/gql/public', {
      query: AnalyticsMutation,
      vars: { ipAddress }
    });
  },
  getSubscription() {
    return this.$axios
      .post('/gql/private', {
        query: SubscriptionQuery
      })
      .then(({ data }) => data.getSubscription);
  },
  checkSlugAvailable(context, slug) {
    return this.$axios
      .post('/gql/private', {
        query: CheckSlugAvailableQuery,
        vars: { slug }
      })
      .then(({ data }) => data.checkSlugAvailable);
  },
  saveResume(context, { resume, base64Image }) {
    return this.$axios
      .post('/gql/private', {
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
      .post('/gql/private', {
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
