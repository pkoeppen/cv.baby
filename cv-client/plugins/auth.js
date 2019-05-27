export default function({ $axios, store }) {
  $axios.interceptors.request.use(async config => {
    const response = await store.dispatch('cognito/getUserSession');
    if (response && response.accessToken && response.accessToken.jwtToken) {
      config.headers.common.Authorization = response.accessToken.jwtToken;
    }
    return config;
  });
}
