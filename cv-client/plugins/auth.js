export default function({ $axios, store }) {
  $axios.interceptors.request.use(async config => {
    let accessToken = await store.dispatch('cognito/getAccessToken');
    if (accessToken) {
      if (process.client) {
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
