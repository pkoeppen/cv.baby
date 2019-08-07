<!-- NOTE: As users' emails are automatically verified upon signup, this page is (for now) defunct. -->

<template>
  <no-ssr>
    <div>
      <navbar />
      <v-divider />
      <v-layout
        class="justify-center align-center"
        style="height: calc(100vh - 125px);"
      >
        <div class="text-xs-center pb-3">
          <v-progress-circular
            v-if="loading"
            :size="40"
            :width="2"
            indeterminate
            color="primary"
            class="mx-4"
          ></v-progress-circular>
          <template v-else>
            <div v-if="!loading && success" class="d-flex align-center">
              <span class="headline open-sans"
                >Your email is now verified.</span
              >
              <v-icon class="bluegrass ml-2" x-large>check</v-icon>
            </div>
            <div v-else>
              <div class="d-flex align-center">
                <span class="headline open-sans"
                  >There was a problem verifying your email.</span
                >
                <v-icon class="red--text ml-2" x-large>close</v-icon>
              </div>
              <div class="mt-3 mx-auto" style="max-width: 450px;">
                <template v-if="codeExpired">
                  Code is expired.
                </template>
                <template v-else>
                  An unknown error occurred.
                </template>
                <span
                  >Please <a href="help@cv.baby">contact support</a> for
                  assistance.</span
                >
              </div>
            </div>
          </template>
        </div>
      </v-layout>
      <cv-footer />
      <v-dialog v-model="signInData.dialog" max-width="400px" persistent>
        <v-form ref="formSignIn" @submit="signIn">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">{{ $t('login') }}</span>
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
                  <v-flex class="caption text-xs-center py-0" xs12>
                    <a @click="showForgotPasswordDialog">{{
                      $t('forgotYourPassword')
                    }}</a>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn
                :loading="signInData.loading"
                color="primary"
                type="submit"
                depressed
                >{{ $t('login') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-dialog v-model="forgotPasswordData.dialog" max-width="400px">
        <v-form ref="formForgotPassword" @submit="forgotPassword">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">{{
                $t('resetPassword')
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="forgotPasswordData.email"
                      :rules="[v => !!v || $t('emailIsRequired')]"
                      :label="$t('email')"
                      required
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn
                :loading="forgotPasswordData.loading"
                color="primary"
                type="submit"
                depressed
              >
                <v-icon v-if="forgotPasswordData.success">check_circle</v-icon
                >{{
                  forgotPasswordData.success
                    ? `&nbsp;${$t('resetLinkSent')}`
                    : $t('sendResetLink')
                }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
  </no-ssr>
</template>
<script>
import Navbar from '~/components/Navbar';
import cvFooter from '~/components/Footer';
export default {
  components: {
    Navbar,
    cvFooter
  },
  data() {
    return {
      loading: true,
      success: false,
      authenticated: !!this.$store.state.cognito.authenticated,
      signInData: {
        dialog: false,
        email: null,
        password: null,
        loading: false
      },
      forgotPasswordData: {
        dialog: false,
        loading: false,
        email: null,
        success: false
      },
      codeExpired: false
    };
  },
  created() {
    if (this.authenticated) {
      this.verifyEmail();
    } else {
      this.signInData.dialog = true;
    }
  },
  methods: {
    verifyEmail() {
      const email = this.$route.query.email;
      const code = this.$route.query.code;

      if (!(email && code)) {
        // redirect
      }

      this.$store
        .dispatch('cognito/verifyAttribute', {
          email,
          attributeName: 'email',
          confirmationCode: code
        })
        .then(() => {
          this.success = true;
          this.loading = false;
          setTimeout(() => {
            // redirect
          }, 1000);
        })
        .catch(error => {
          // TODO
          console.error(error);

          if (error.code === 'ExpiredCodeException') {
            this.codeExpired = true;
          }

          this.success = false;
          this.loading = false;
          setTimeout(() => {
            // redirect or send new code
          }, 1000);
        });
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
          this.signInData.dialog = false;
          this.verifyEmail();
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
    showForgotPasswordDialog(event) {
      event.preventDefault();
      this.signInData.dialog = false;
      this.forgotPasswordData.dialog = true;
    },
    forgotPassword(event) {
      event.preventDefault();
      if (!this.$refs.formForgotPassword.validate()) {
        return;
      }
      this.forgotPasswordData.loading = true;
      this.$store
        .dispatch('cognito/forgotPassword', {
          email: this.forgotPasswordData.email
        })
        .then(() => {
          this.forgotPasswordData.success = true;
          setTimeout(() => {
            this.forgotPasswordData.dialog = false;
            this.forgotPasswordData.success = false;
          }, 1500);
        })
        .catch(error => {
          // TODO
          console.error('forgotPassword() error:', error);
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorResettingPassword')
          });
        })
        .finally(() => {
          this.forgotPasswordData.loading = false;
        });
    }
  }
};
</script>
