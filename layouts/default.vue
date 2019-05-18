<template>
  <v-app>
    <v-content>
      <nuxt />
      <v-footer height="auto" color="primary lighten-2">
        <v-layout justify-space-between align-center>
          <v-flex py-3 text-xs-center white--text xs12>
            &copy;2019 — <strong>Peter Koeppen</strong>
          </v-flex>
          <v-flex py-3 text-xs-center white--text xs12>
            <v-btn flat dark>
              <v-icon class="mr-2">language</v-icon>
              English
            </v-btn>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'cvbaby'
    };
  }
};
</script>
<style lang="stylus" scoped>
#app
  background-color: #ffffff
</style>
