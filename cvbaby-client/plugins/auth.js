export default function({ $axios, store }) {
  $axios.interceptors.request.use(async config => {
    if (!/\/gql\/(public|private)$/.test(config.url)) {
      // If non-GQL request (e.g., to S3) don't add auth header.
      return config;
    }
    const user = store.state.cognito.authenticated;
    if (user) {
      let accessToken = user.signInUserSession.accessToken;
      if (process.client && accessToken.payload.exp) {
        // If token is expired, refresh it.
        const expiration = accessToken.payload.exp;
        const now = Math.floor(new Date().getTime() / 1000);
        if (expiration < now || !expiration) {
          ({ accessToken } = await store.dispatch(
            'cognito/checkAuthentication'
          ));
        }
      }
      config.headers.common.Authorization = accessToken.jwtToken;
    }
    return config;
  });
}
