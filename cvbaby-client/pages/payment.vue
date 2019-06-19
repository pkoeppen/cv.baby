<template>
  <no-ssr>
    <div>
      <v-layout justify-center align-center wrap>
        <v-flex xs12 md8>
          <v-toolbar class="cv-toolbar elevation-0">
            <v-toolbar-title
              class="cv-logo font-weight-black"
              style="font-size: 28px"
            >
              <nuxt-link
                :to="localePath('index')"
                style="text-decoration: none; color: inherit;"
              >
                <span>cv</span><span>baby&nbsp;</span>
              </nuxt-link>
            </v-toolbar-title>
          </v-toolbar>
        </v-flex>
        <v-flex xs12>
          <v-divider />
        </v-flex>
        <v-flex class="mt-4 mb-2" xs12 md8>
          <!-- eslint-disable -->
          <div
            class="cv-trial-text text-xs-center font-weight-black"
            v-html="$t('free14DayTrialForCvBabyPro')"
          />
          <!-- eslint-enable -->
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl fill-height>
            <v-layout justify-center>
              <v-flex class="px-5" xs12 md5>
                <div class="mb-3">1. {{ $t('chooseABillingCycle') }}</div>
                <v-card class="cv-step elevation-0">
                  <v-tabs v-model="activeBillingCycleTab" grow>
                    <v-tab ripple>{{ $t('monthly') }}</v-tab>
                    <v-tab-item>
                      <v-container>
                        <div class="cv-billing-detail mb-2">
                          <div class="font-weight-black">
                            {{ $t('first14Days') }}
                          </div>
                          <div
                            class="font-weight-black text-xs-right text-uppercase"
                          >
                            {{ $t('free') }}
                          </div>
                        </div>
                        <div class="cv-billing-detail mb-2">
                          <div>
                            {{ $t('pricePerMonth') }}
                          </div>
                          <div class="text-xs-right">
                            USD 9/{{ $t('month') }}
                          </div>
                        </div>
                        <div class="cv-billing-detail mb-2">
                          <div>
                            {{ $t('billedMonthly') }}
                          </div>
                          <div class="text-xs-right">
                            USD 9
                          </div>
                        </div>
                      </v-container>
                    </v-tab-item>
                    <v-tab ripple>{{ $t('yearly') }}</v-tab>
                    <v-tab-item>
                      <v-container>
                        <div class="cv-billing-detail mb-2">
                          <div class="font-weight-black">
                            {{ $t('first14Days') }}
                          </div>
                          <div
                            class="font-weight-black text-xs-right text-uppercase"
                          >
                            {{ $t('free') }}
                          </div>
                        </div>
                        <div class="cv-billing-detail mb-2">
                          <div>
                            {{ $t('pricePerMonth') }}
                          </div>
                          <div class="text-xs-right">
                            USD 3/{{ $t('month') }}
                          </div>
                        </div>
                        <div class="cv-billing-detail mb-2">
                          <div>
                            {{ $t('billedYearly') }}
                          </div>
                          <div class="text-xs-right">
                            USD 36
                          </div>
                        </div>
                      </v-container>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
                <template v-if="!authenticated">
                  <div class="mb-3 mt-4">2. {{ $t('createYourAccount') }}</div>
                  <!-- TODO: add rules for these fields -->
                  <v-text-field
                    v-model="signUpData.email"
                    :label="$t('email')"
                    outline
                    required
                  />
                  <v-text-field
                    v-model="signUpData.password"
                    :label="$t('password')"
                    type="password"
                    outline
                    required
                  />
                </template>
                <div class="mb-3 mt-4">
                  {{ authenticated ? '2' : '3' }}. {{ $t('choosePayment') }}
                </div>
                <v-card class="cv-step elevation-0">
                  <v-tabs v-model="activePaymentTypeTab" grow>
                    <v-tab ripple>{{ $t('debitCreditCard') }}</v-tab>
                    <v-tab-item>
                      <payment-fields ref="paymentFields" />
                    </v-tab-item>
                    <v-tab ripple>PayPal</v-tab>
                    <v-tab-item>
                      <v-container>
                        <div class="cv-billing-detail">
                          <div class="font-weight-black">
                            {{ $t('youWillBeRedirectedToPayPal') }}
                          </div>
                        </div>
                      </v-container>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
                <div
                  class="mb-1 mt-4"
                  style="display: flex; justify-content: flex-start; align-items: center;"
                >
                  <div>
                    <v-icon class="px-2">
                      check_circle
                    </v-icon>
                  </div>
                  <div>{{ $t('youWontBeChargedToday') }}</div>
                </div>
                <div
                  class="mb-1"
                  style="display: flex; justify-content: flex-start; align-items: center;"
                >
                  <div>
                    <v-icon class="px-2">
                      check_circle
                    </v-icon>
                  </div>
                  <div>{{ $t('cancelAnyTimeBefore') }} {{ paidStartDate }}</div>
                </div>
                <div class="text-xs-center">
                  <v-btn
                    :loading="signUpData.loading"
                    :color="signUpData.success ? 'success' : 'primary'"
                    class="my-4"
                    depressed
                    @click="signUp"
                  >
                    <v-icon v-if="signUpData.success">check_circle</v-icon>
                    {{
                      signUpData.success
                        ? $t('freeTrialStarted')
                        : $t('startFreeTrial')
                    }}
                  </v-btn>
                  <div
                    class="bluegrass"
                    style="font-size: 12px; font-family: 'Open Sans', sans-serif"
                  >
                    <v-icon class="bluegrass mr-1" style="font-size: 16px">
                      lock
                    </v-icon>
                    {{ $t('allTransactionsAreSecuredWithSSL') }}
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md5>
                <v-card class="cv-confirmation elevation-0">
                  <v-container class="pa-5">
                    <h4 style="font-size: 18px">
                      <div class="cv-logo" style="display: inline;">
                        <span>cv</span><span>baby</span>
                      </div>
                      pro
                    </h4>
                    <v-divider class="my-4" />
                    <div
                      class="mb-2"
                      style="display: flex; justify-content: flex-start; align-items: center;"
                    >
                      <div>
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                      </div>
                      <div>{{ $t('unlimitedUsage') }}</div>
                    </div>
                    <div
                      class="mb-2"
                      style="display: flex; justify-content: flex-start; align-items: center;"
                    >
                      <div>
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                      </div>
                      <div>{{ $t('twentyFourSevenSupport') }}</div>
                    </div>
                    <div
                      style="display: flex; justify-content: flex-start; align-items: center;"
                    >
                      <div>
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                      </div>
                      <div>{{ $t('noAds') }}</div>
                    </div>
                    <v-divider class="my-4" />
                    <div
                      style="display: flex; justify-content: space-between; align-items: center;"
                    >
                      <div class="bluegrass font-weight-black">
                        {{ $t('renewsAutomatically') }}<br />{{
                          $t('cancelAnyTime')
                        }}.
                      </div>
                      <div>
                        <v-icon>autorenew</v-icon>
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <div
            class="text-xs-center my-5"
            style="font-family: 'Open Sans', sans-serif; font-size: 16px"
          >
            {{ $t('havingTrouble') }}
            <a href="mailto:support@cv.baby">{{ $t('contactUs') }}</a>
          </div>
        </v-flex>
      </v-layout>
      <cv-footer />
    </div>
  </no-ssr>
</template>

<script>
import cvFooter from '~/components/Footer';
import PaymentFields from '~/components/PaymentFields';
import { StartSubscriptionMutation } from '~/assets/js/queries';
export default {
  components: {
    cvFooter,
    PaymentFields
  },
  data() {
    let activeBillingCycleTab = null;
    if (this.$route.query.cycle === 'monthly') {
      activeBillingCycleTab = 0;
    }
    if (this.$route.query.cycle === 'yearly') {
      activeBillingCycleTab = 1;
    }
    return {
      activeBillingCycleTab,
      activePaymentTypeTab: null,
      signUpData: {
        email: null,
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
    paidStartDate() {
      const date = new Date(Date.now() + 12096e5);
      return date.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
  },
  methods: {
    signUp() {
      this.signUpData.loading = true;
      Promise.resolve()
        .then(() => {
          if (!this.authenticated) {
            return this.$store
              .dispatch('cognito/signUp', {
                email: this.signUpData.email,
                password: this.signUpData.password
              })
              .then(() =>
                this.$store.dispatch('cognito/authenticateUser', {
                  email: this.signUpData.email,
                  password: this.signUpData.password
                })
              );
          }
        })
        .then(() => this.$refs.paymentFields.generateNonce())
        .then(paymentMethodToken => {
          return this.$axios.post('/gql/private', {
            query: StartSubscriptionMutation,
            vars: {
              paymentMethodToken,
              planID:
                this.activeBillingCycleTab === 0
                  ? 'cvbaby-monthly'
                  : 'cvbaby-yearly'
            }
          });
        })
        .then(result => {
          this.signUpData.loading = false;
          this.signUpData.success = true;
          setTimeout(() => this.$router.push({ path: 'account' }), 2000);
        })
        .catch(({ response: { status } }) => {
          if (status === 409) {
            this.$store.dispatch('showSnackbar', {
              color: 'red',
              // TODO: Translate this
              message: 'Card type not accepted. Please try another.'
            });
          } else {
            this.$store.dispatch('showSnackbar', {
              color: 'red',
              // TODO: Translate this
              message:
                'Error creating subscription. Please check your connection.'
            });
          }
        })
        .finally(() => {
          this.signUpData.loading = false;
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.cv-toolbar
  background-color: #ffffff !important
.cv-logo
  span
    letter-spacing: -.03em
  span:nth-child(2)
    color: #2196f3
.cv-trial-text
  font-size: 28px
  .cv-logo
    font-size: 32px
.cv-pricing-header, .cv-pricing-header *
  font-family: 'Open Sans'
  font-weight: 200
  text-align: center
  display: block
.cv-pricing-header
  .cv-price
    position: relative
    display: inline
    font-size: 64px
    &:after
      content: 'USD'
      position: absolute
      top: 28px
      left: -30px
      font-size: 13px
      color: $grey.darken-1
  .cv-period
    font-size: 22px
  span
    font-size: 13px
.cv-step
  border: 1px solid #E0E0E0
.cv-feature
  justify-content: center
  align-items: center
.cv-billing-detail
  display: flex
  justify-content: space-between
.cv-confirmation
  border: 1px solid $bluegrass
</style>
