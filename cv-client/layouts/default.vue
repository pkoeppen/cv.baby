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
    <v-snackbar v-model="showSnackbar" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
      <v-btn flat @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showSnackbar: false
    };
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  },
  watch: {
    snackbar() {
      this.showSnackbar = true;
    }
  },
  created() {
    this.$store
      .dispatch('cognito/checkAuthentication')
      .then(session => {
        if (!session) {
          return this.$store
            .dispatch('cognito/signOut')
            .then(() => this.$router.push({ path: '/' }));
        }
      })
      .catch(() => this.$store.dispatch('cognito/signOut'));
  }
};
</script>
<style lang="stylus" scoped>
#app
  background-color: #ffffff
</style>
