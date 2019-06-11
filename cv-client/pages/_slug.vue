<template>
  <resume :resume="resume" />
</template>

<script>
import Resume from '~/components/Resume';
export default {
  components: {
    Resume
  },
  asyncData({ error, store, params }) {
    return store
      .dispatch('api/getResume', params.slug)
      .then(resume => {
        console.log(JSON.stringify(resume, null, 2));
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
