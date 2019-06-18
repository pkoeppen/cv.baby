<template>
  <v-app>
    <v-content>
      <nuxt />
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
      .catch(() => this.$store.dispatch('cognito/signOut'));
  }
};
</script>
<style lang="stylus" scoped>
#app
  background-color: #ffffff
</style>
