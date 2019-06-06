export default function({ $axios, store }) {
  $axios.interceptors.request.use(async config => {
    const accessToken = await store.dispatch('cognito/getAccessToken');
    config.headers.common.Authorization = accessToken;
    return config;
  });
}
