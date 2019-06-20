<template>
  <div>
    <resume ref="resume" :resume="resume" :headless="headless" />
    <cv-footer
      v-if="!headless"
      :is-resume="true"
      :copyright-holder="resume.name"
      :color="resume.color"
    />
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
  data() {
    return {
      html2canvas: {},
      svg: null
    };
  },
  asyncData({ error, store, params, query }) {
    return store
      .dispatch('api/getResume', params.slug)
      .then(resume => {
        resume.references.map(reference => ({ dialog: false, ...reference }));
        return { resume, headless: !!query.headless };
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
