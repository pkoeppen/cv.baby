import { ResumesQuery, SaveResumeMutation } from '~/assets/js/queries';

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
  }
};

export const mutations = {
  setAuthenticating(_state, authenticating) {
    // eslint-disable-next-line no-param-reassign
    _state.authenticating = authenticating;
  }
};
