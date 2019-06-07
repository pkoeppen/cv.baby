import {
  ResumeQuery,
  ResumesQuery,
  SubscriptionQuery,
  CheckSlugAvailableQuery,
  SaveResumeMutation,
  RemoveResumeMutation
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
