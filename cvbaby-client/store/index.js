export const state = () => ({
  snackbar: {}
});

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('cognito/serverInit', req);
  },
  showSnackbar(context, snackbar) {
    context.commit('setSnackbar', snackbar);
  }
};

export const mutations = {
  setSnackbar(_state, snackbar) {
    _state.snackbar = snackbar;
  }
};
