import {
  ResumesQuery,
  SubscriptionQuery,
  SaveResumeMutation,
  RemoveResumeMutation
} from '~/assets/js/queries';

export const state = () => ({
  authenticating: false,
  authenticated: null
});

export const actions = {
  getResumes() {
    return this.$axios
      .post('/gql/private', {
        query: ResumesQuery
      })
      .then(({ data }) => data.getResumes);
  },
  getSubscription() {
    return this.$axios
      .post('/gql/private', {
        query: SubscriptionQuery
      })
      .then(({ data }) => data.getSubscription);
  },
  saveResume(context, { index, resume }) {
    return this.$axios
      .post('/gql/private', {
        query: SaveResumeMutation,
        vars: {
          index,
          resume
        }
      })
      .then(({ data }) => data.saveResume);
  },
  removeResume(context, index) {
    return this.$axios
      .post('/gql/private', {
        query: RemoveResumeMutation,
        vars: { index }
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
