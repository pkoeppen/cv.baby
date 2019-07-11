<template>
  <no-ssr>
    <div :style="navbarStyle">
      <v-container v-if="showNavbar" class="pa-0">
        <v-toolbar class="cv-toolbar elevation-0" :style="navbarStyle">
          <v-toolbar-title>
            <nuxt-link
              :to="localePath('index')"
              style="text-decoration: none; color: inherit; outline: 0;"
            >
              <div class="cv-logo"><span>cv</span><span>baby&nbsp;</span></div>
            </nuxt-link>
          </v-toolbar-title>
          <template v-if="showButtons">
            <v-spacer />
            <template v-if="authenticated">
              <v-btn
                v-if="subscriptionAction"
                :to="subscriptionAction.link"
                class="mr-3"
                color="primary"
                outline
                small
                >{{ subscriptionAction.text }}</v-btn
              >
              <v-menu bottom left :nudge-width="200" offset-x>
                <template v-slot:activator="{ on }">
                  <v-btn class="mx-0" icon v-on="on">
                    <v-avatar size="36">
                      <img
                        :src="getAvatarSource()"
                        @error="
                          event =>
                            (event.target.src = require(`~/assets/images/avatarPlaceholder.png`))
                        "
                      />
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-list>
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                        <img
                          :src="getAvatarSource()"
                          @error="
                            event =>
                              (event.target.src = require(`~/assets/images/avatarPlaceholder.png`))
                          "
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
                    <v-list-tile :to="localePath('account')">
                      <v-list-tile-avatar>
                        <v-icon>account_box</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-title>{{ $t('account') }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      @click="$router.push({ path: localePath('help') })"
                    >
                      <v-list-tile-avatar>
                        <v-icon>assignment_late</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-title>{{ $t('help') }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="signout">
                      <v-list-tile-avatar>
                        <v-icon>exit_to_app</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-title>{{ $t('logout') }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-menu>
            </template>
            <template v-else>
              <v-dialog v-model="signInData.dialog" max-width="400px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="text-none"
                    color="primary"
                    flat
                    depressed
                    v-on="on"
                    >{{ $t('login') }}</v-btn
                  >
                </template>
                <v-form ref="formSignIn" @submit="signIn">
                  <v-card>
                    <v-card-title
                      class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
                    >
                      <span class="cv-dialog-header headline">{{
                        $t('login')
                      }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container class="py-0" grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field
                              v-model="signInData.email"
                              :rules="[v => !!v || $t('emailIsRequired')]"
                              :label="$t('email')"
                              required
                            />
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field
                              v-model="signInData.password"
                              :rules="[v => !!v || $t('passwordIsRequired')]"
                              :label="$t('password')"
                              type="password"
                              required
                            />
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-center pb-4">
                      <v-btn
                        :loading="signInData.loading"
                        color="primary"
                        type="submit"
                        >{{ $t('login') }}</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
              <v-dialog v-model="signUpData.dialog" max-width="400px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" v-on="on">{{ $t('freeTrial') }}</v-btn>
                </template>
                <v-form ref="formSignUp" @submit="signUp">
                  <v-card>
                    <v-card-title
                      class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
                    >
                      <!-- eslint-disable -->
                <div
                  class="cv-dialog-header headline"
                  v-html="$t('tryCvBabyForFree')"
                />
                      <!-- eslint-enable -->
                    </v-card-title>
                    <v-card-text>
                      <v-container class="py-0" grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field
                              v-model="signUpData.email"
                              :rules="[v => !!v || $t('emailIsRequired')]"
                              :label="$t('email')"
                              required
                            />
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field
                              v-model="signUpData.password"
                              :rules="[v => !!v || $t('passwordIsRequired')]"
                              :label="$t('password')"
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
                            ? `&nbsp;${$t('accountCreated')}`
                            : $t('startFreeTrial')
                        }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </template>
          </template>
        </v-toolbar>
      </v-container>
    </div>
  </no-ssr>
</template>

<script>
import { SubscriptionState } from '~/assets/js/util';
export default {
  name: 'Navbar',
  data() {
    return {
      poolID: process.env.CVBABY_USER_POOL_ID,
      clientID: process.env.CVBABY_USER_POOL_CLIENT_ID,
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
    showNavbar() {
      return !/^(_slug)/.test(this.$route.name);
    },
    showButtons() {
      return !/^(payment|pricing)/.test(this.$route.name);
    },
    navbarStyle() {
      const style = /^(pricing)/.test(this.$route.name)
        ? 'background: rgb(245, 245, 245);'
        : 'background: white';
      return style;
    },
    authenticated() {
      return !!this.$store.state.cognito.authenticated;
    },
    username() {
      return (this.$store.state.cognito.authenticated || {}).signInUserSession
        .idToken.payload.email;
    },
    subscriptionAction() {
      const authenticated = this.$store.state.cognito.authenticated;
      if (authenticated) {
        const state = // eslint-disable-next-line
          authenticated.signInUserSession.idToken.payload[
            'custom:subscriptionState'
          ];
        switch (state) {
          case SubscriptionState.NOT_STARTED:
            return {
              text: this.$t('startSubscription'),
              link: this.localePath({
                name: 'payment',
                query: { cycle: 'yearly' }
              })
            };
          case SubscriptionState.STARTED:
            return null;
          case SubscriptionState.STOPPED:
            // TODO: Clicking this button should simply restart their subscription.
            return {
              text: this.$t('renewSubscription'),
              link: this.localePath('account')
            };
        }
      }
      return null;
    }
  },
  methods: {
    getAvatarSource() {
      if (process.client && this.$store.state.cognito.authenticated) {
        return `https://${process.env.CVBABY_HOST_DATA}/users/${
          this.$store.state.cognito.userID
        }/profile.jpeg`;
      } else {
        return require(`~/assets/images/avatarPlaceholder.png`);
      }
    },
    signIn(event) {
      event.preventDefault();
      if (!this.$refs.formSignIn.validate()) {
        return;
      }
      this.signInData.loading = true;
      this.$store
        .dispatch('cognito/authenticateUser', {
          email: this.signInData.email,
          password: this.signInData.password
        })
        .then(() => this.$store.dispatch('cognito/getUserData'))
        .then(() => {
          this.$router.push({
            path: this.localePath('account')
          });
        })
        .catch(error => {
          // TODO
          console.error('signIn() error:', error);
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorSigningIn')
          });
        })
        .finally(() => {
          this.signInData.loading = false;
        });
    },
    signUp(event) {
      event.preventDefault();
      if (!this.$refs.formSignUp.validate()) {
        return;
      }
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
            this.$router.push({ path: this.localePath('pricing') });
            this.$store
              .dispatch('cognito/authenticateUser', {
                email: this.signUpData.email,
                password: this.signUpData.password
              })
              .then(() => this.$store.dispatch('cognito/getUserData'));
          }, 2250);
        })
        .catch(error => {
          // TODO
          console.error('signUp() error:', error);
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorSigningUp')
          });
        })
        .finally(() => {
          this.signUpData.loading = false;
        });
    },
    signout() {
      this.$store.dispatch('cognito/signOut').then(() => {
        this.$router.push({
          path: this.localePath('index')
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
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
