<template>
  <v-toolbar class="cv-toolbar elevation-0">
    <v-toolbar-title class="cv-logo font-weight-black">
      <nuxt-link to="/" style="text-decoration: none; color: inherit;">
        <span>cv</span><span>baby&nbsp;</span>
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <template v-if="authenticated">
      <v-btn class="mr-3" color="primary" flat depressed outline small
        >Renew Subscription</v-btn
      >
      <v-menu
        bottom
        left
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-avatar color="indigo" size="36">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ username }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  <div
                    class="cv-logo font-weight-black"
                    style="font-size: 16px; display: inline;"
                  >
                    <!-- eslint-disable-next-line -->
                    <span>cv</span><span>baby&nbsp;</span>pro
                  </div>
                  &ndash; 135 days remaining
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn class="red--text" icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile to="/settings">
              <v-list-tile-avatar>
                <v-icon>account_box</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>Account</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$router.push({ path: '/help' })">
              <v-list-tile-avatar>
                <v-icon>assignment_late</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>Help</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="signout">
              <v-list-tile-avatar>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </template>
    <template v-else>
      <v-dialog v-model="signInData.dialog" max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn class="text-none" color="primary" flat depressed v-on="on"
            >Login</v-btn
          >
        </template>
        <v-form @submit="signIn">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">Login</span>
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="signInData.email"
                      label="Email"
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="signInData.password"
                      label="Password"
                      type="password"
                      required
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn :loading="signInData.loading" color="primary" type="submit"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-dialog v-model="signUpData.dialog" max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on">Free Trial</v-btn>
        </template>
        <v-form @submit="signUp">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">
                Try
                <div class="cv-logo" style="display: inline;">
                  <span>cv</span>
                  <span>baby</span>
                </div>
                for free
              </span>
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="signUpData.email"
                      label="Email"
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="signUpData.password"
                      label="Password"
                      type="password"
                      required
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn
                :loading="signUpData.loading"
                :color="signUpData.success ? 'success' : 'primary'"
                type="submit"
              >
                <v-icon v-if="signUpData.success">check_circle</v-icon>
                {{
                  signUpData.success
                    ? '&nbsp;Account created'
                    : 'Start free trial'
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      signInData: {
        dialog: false,
        email: 'p.hartzog.koeppen@gmail.com',
        password: null,
        loading: false
      },
      signUpData: {
        dialog: false,
        email: 'p.hartzog.koeppen@gmail.com',
        password: null,
        loading: false,
        success: false
      }
    };
  },
  computed: {
    authenticated() {
      return !!this.$store.state.cognito.authenticated;
    },
    username() {
      return (this.$store.state.cognito.authenticated || {}).signInUserSession
        .idToken.payload.email;
    }
  },
  methods: {
    signIn(event) {
      event.preventDefault();
      this.signInData.loading = true;
      this.$store
        .dispatch('cognito/authenticateUser', {
          email: this.signInData.email,
          password: this.signInData.password
        })
        .then(() => {
          this.$router.push({
            path: '/settings'
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.signInData.loading = false;
        });
    },
    signUp(event) {
      event.preventDefault();
      this.signUpData.loading = true;
      this.$store
        .dispatch('cognito/signUp', {
          email: this.signUpData.email,
          password: this.signUpData.password
        })
        .then(() => {
          this.signUpData.loading = false;
          this.signUpData.success = true;
          setTimeout(() => {
            this.signUpData.dialog = false;
            this.signUpData.success = false;
          }, 1500);
          setTimeout(() => {
            this.$router.push({ path: 'pricing' });
            this.$store.dispatch('cognito/authenticateUser', {
              email: this.signUpData.email,
              password: this.signUpData.password
            });
          }, 2250);
        })
        .finally(() => {
          this.signUpData.loading = false;
        });
    },
    signout() {
      this.$store.dispatch('cognito/signOut').then(() => {
        this.$router.push({
          path: '/'
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.cv-toolbar {
  background-color: #ffffff !important;
}

.cv-logo {
  font-size: 28px;

  span {
    letter-spacing: -0.03em;
  }

  span:nth-child(2) {
    color: #2196f3;
  }
}

.cv-header, .cv-subheader {
  line-height: 1.5em !important;
}

.cv-header {
  font-size: 28px;
}

.cv-subheader {
  font-size: 20px;
  font-family: 'Open Sans', sans-serif !important;
}

.cv-ribbon {
  position: absolute;
  left: 0;
  top: 300px;
  width: 200px;

  .cv-ribbon-text {
    font-family: 'Open Sans', sans-serif !important;
    position: absolute;
    left: 50px;
    top: 20px;
    transform: rotate(8deg);

    .rate {
      font-size: 34px;
      font-weight: 900;
      line-height: 36px;
    }
  }

  img {
    width: 100%;
  }
}

.cv-dialog-header * {
  font-size: 24px !important;
  font-weight: 900 !important;
}
</style>
