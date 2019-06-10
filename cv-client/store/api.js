import {
  ResumeQuery,
  ResumesQuery,
  SubscriptionQuery,
  CheckSlugAvailableQuery,
  SaveResumeMutation,
  RemoveResumeMutation,
  UploadURLQuery
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
  },
  async uploadImage(context, { index, base64Image }) {
    // Extract the content type from the base64 image string.
    const contentType = base64Image.split(',')[0].match(/:(.*?);/)[1];
    const extension = contentType.split('/')[1];
    // const contentType = '';
    const imageFile = await fetch(base64Image)
      .then(res => res.blob())
      .then(blob => new File([blob], `profile.${extension}`));
    const uploadURL = await this.$axios
      .post('/gql/private', {
        query: UploadURLQuery,
        vars: {
          index,
          contentType
        }
      })
      .then(({ data }) => data.getUploadURL);
    return this.$axios.put(uploadURL, imageFile, {
      // onUploadProgress: progress,
      // transformRequest: [
      //   (data, headers) => {
      //     delete headers.common;
      //     delete headers.put;
      //     headers['Content-Type'] = imageFile.type;
      //     return data;
      //   }
      // ]
    });
  }
};

export const mutations = {
  setAuthenticating(_state, authenticating) {
    // eslint-disable-next-line no-param-reassign
    _state.authenticating = authenticating;
  }
};
