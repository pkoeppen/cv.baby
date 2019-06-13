<template>
  <div>
    <v-btn @click="foo">pdf</v-btn>
    <canvas ref="canvas" width="1500" height="1500"></canvas>
    <img :src="svg" />
    <resume ref="resume" :resume="resume" />
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
  data() {
    return {
      html2canvas: {},
      svg: null
    };
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
  },
  created() {
    if (process.client) {
      this.html2canvas = require('html2canvas');
      this.rasterize = require('rasterizehtml');
    }
  },
  methods: {
    async foo() {
      const element = document;
      const canvas = this.$refs.canvas;
      const { svg } = await this.rasterize.drawDocument(element, canvas);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      this.svg = URL.createObjectURL(blob);
    },
    blah() {
      console.log('got error');
    }
  }
};
</script>
