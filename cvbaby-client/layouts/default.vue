<template>
  <v-app>
    <v-content>
      <navbar />
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
import Navbar from '~/components/Navbar';
export default {
  components: {
    Navbar
  },
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
    this.$store.dispatch('cognito/checkAuthentication').catch(error => {
      // TODO: Don't log errors in production
      console.error('Error (default layout):', error);
      // this.$store.dispatch('cognito/signOut');
      // this.$router.push({ path: this.localePath('index') });
    });
  }
};
</script>
<style lang="stylus" scoped>
#app
  background-color: #ffffff
</style>
