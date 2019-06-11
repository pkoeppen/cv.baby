<template>
  <div>
    <resume :resume="resume" />
    <cv-footer :is-resume="true" :copyright-holder="resume.name" />
  </div>
</template>

<script>
import cvFooter from '~/components/Footer';
import Resume from '~/components/Resume';
export default {
  components: {
    cvFooter,
    Resume
  },
  asyncData({ error, store, params }) {
    return store
      .dispatch('api/getResume', params.slug)
      .then(resume => {
        resume.references.map(reference => ({ dialog: false, ...reference }));
        return { resume };
      })
      .catch(({ response }) =>
        error({
          statusCode: (response || {}).status || 500,
          message: (response || {}).data || 'An unknown error occurred.'
        })
      );
  }
};
</script>
