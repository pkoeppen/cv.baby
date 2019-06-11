<template>
  <v-footer height="auto" color="primary lighten-2">
    <v-container class="py-0">
      <v-layout class="caption" justify-space-between align-center>
        <div class="py-3 text-xs-center white--text">
          &copy;2019 — <strong>{{ copyrightHolder }}</strong>
        </div>
        <div v-if="isResume" class="py-3 text-xs-center white--text">
          <nuxt-link
            style="color: #FFFFFF; text-decoration: none;"
            to="/pricing"
            >Impressed? Create your own resume with
            <span class="font-weight-bold">cvbaby pro</span></nuxt-link
          >
        </div>
        <div v-else class="py-3 text-xs-center white--text">
          <v-btn class="ma-0 caption" flat dark small>
            <v-icon class="mr-2" small>language</v-icon>
            English
          </v-btn>
        </div>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    isResume: {
      type: Boolean,
      default: false
    },
    copyrightHolder: {
      type: String,
      default: 'Peter Koeppen'
    }
  },
  computed: {}
};
</script>
