<template>
  <no-ssr>
    <div>
      <v-layout column wrap>
        <v-flex xs12>
          <v-divider />
        </v-flex>
        <v-flex xs12>
          <v-container class="py-0">
            <v-layout row justify-center>
              <v-flex
                style="min-height: 100vh; border-right: 1px solid #E0E0E0;"
                shrink
              >
                <h2 class="mt-5 mb-4">Account</h2>
                <div class="vertical-tabs vertical-tabs--horizontal-text">
                  <v-tabs v-model="tabs" @change="$emit('input', $event)">
                    <v-tab>{{ $t('resumes') }}</v-tab>
                    <v-tab>{{ $t('password') }}</v-tab>
                    <v-tab>{{ $t('billingAndSubscription') }}</v-tab>
                    <v-tab>{{ $t('invoices') }}</v-tab>
                    <v-tab>{{ $t('emailNotifications') }}</v-tab>
                  </v-tabs>
                </div>
              </v-flex>
              <v-flex>
                <v-tabs-items v-model="tabs">
                  <v-tab-item>
                    <v-container class="py-5 pl-5 pr-0" grid-list-xl>
                      <v-layout wrap>
                        <v-flex
                          v-if="resumes.loading"
                          class="py-5 text-xs-center"
                        >
                          <v-progress-circular
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </v-flex>
                        <template v-else-if="resumes.resumes.length">
                          <v-flex
                            v-for="(resume, index) in resumes.resumes"
                            :key="index"
                            xs12
                            sm6
                            md4
                          >
                            <v-badge
                              color="success"
                              overlap
                              style="width: 100%;"
                            >
                              <template v-slot:badge>
                                <v-icon dark>save</v-icon>
                              </template>
                              <v-card class="text-xs-center">
                                <v-card-title class="title justify-center">
                                  {{ resume.alias }}
                                </v-card-title>
                                <v-card-text>
                                  <v-avatar size="100">
                                    <v-img
                                      :src="resume.resumeImageSource"
                                      :lazy-src="resume.resumeImageSource"
                                      aspect-ratio="1"
                                      @error="setImagePlaceholder(index)"
                                    >
                                      <template v-slot:placeholder>
                                        <v-layout
                                          fill-height
                                          align-center
                                          justify-center
                                          ma-0
                                        >
                                          <v-progress-circular
                                            indeterminate
                                            color="grey lighten-5"
                                          />
                                        </v-layout>
                                      </template>
                                    </v-img>
                                  </v-avatar>
                                </v-card-text>
                                <v-card-actions class="justify-center">
                                  <v-btn icon depressed :to="resume.slug"
                                    ><v-icon>link</v-icon></v-btn
                                  >
                                  <v-btn
                                    icon
                                    depressed
                                    :to="
                                      localePath({
                                        name: 'account-editor',
                                        query: { i: index }
                                      })
                                    "
                                    ><v-icon>edit</v-icon></v-btn
                                  >
                                  <v-btn
                                    icon
                                    depressed
                                    :to="
                                      localePath({
                                        name: 'account-analytics',
                                        query: { i: index }
                                      })
                                    "
                                  >
                                    <v-icon>trending_up</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-badge>
                          </v-flex>
                        </template>
                        <v-flex v-else class="text-xs-center py-5" xs12>
                          <div class="title">
                            {{ $t('youHaventSavedAnyResumesYet') }}
                          </div>
                          <!-- eslint-disable -->
                          <div
                            class="mt-2 open-sans"
                            v-html="$t('clickHereToLaunchTheEditor')"
                          />
                          <!-- eslint-enable -->
                          <v-btn
                            :to="localePath('account-editor')"
                            color="primary"
                            class="mx-0 mt-4"
                            depressed
                          >
                            {{ $t('launchEditor') }}
                            <v-icon class="ml-1" small>launch</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container
                      class="pa-5"
                      style="margin: 0; max-width: 600px"
                    >
                      <h2>{{ $t('changePassword') }}</h2>
                      <v-text-field
                        v-model="password.currentPassword"
                        prepend-icon="lock"
                        :label="$t('oldPassword')"
                        type="password"
                        required
                      />
                      <v-text-field
                        v-model="password.newPassword"
                        prepend-icon="lock"
                        :label="$t('newPassword')"
                        type="password"
                        required
                      />
                      <v-text-field
                        v-model="password.newPasswordConfirm"
                        prepend-icon="lock"
                        :label="$t('repeatPassword')"
                        type="password"
                        required
                      />
                      <v-btn
                        :loading="password.loading"
                        :color="password.success ? 'success' : 'primary'"
                        class="mt-4"
                        depressed
                        @click="changePassword"
                      >
                        <v-icon v-if="password.success">check_circle</v-icon>
                        {{
                          password.success
                            ? $t('passwordChanged')
                            : $t('changePassword')
                        }}
                      </v-btn>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container
                      class="pa-5"
                      style="margin: 0; max-width: 600px;"
                    >
                      <div style="display: flex; align-items: center;">
                        <h2>{{ $t('subscription') }}</h2>
                        <template v-if="payment.subscription">
                          <v-icon
                            v-if="payment.subscription.status === 'Active'"
                            class="ml-2 bluegrass"
                            style="font-size: 18px;"
                          >
                            play_arrow
                          </v-icon>
                          <v-icon
                            v-else
                            class="ml-2 red--text"
                            style="font-size: 18px;"
                          >
                            stop
                          </v-icon>
                        </template>
                      </div>
                      <v-divider class="mt-2 mb-3" />
                      <div
                        style="display: flex; align-items: center; justify-content: space-between;"
                      >
                        <div>
                          <div
                            class="cv-logo font-weight-black"
                            style="display: inline; font-size: 16px;"
                          >
                            <span>cv</span><span>baby</span> pro
                          </div>
                          <div
                            class="open-sans grey--text"
                            style="display: inline;"
                          >
                            {{
                              (payment.subscription || {}).trialPeriod
                                ? $t('trial')
                                : ''
                            }}
                          </div>
                        </div>
                        <div
                          v-if="payment.subscription"
                          :class="
                            payment.subscription.status === 'Active'
                              ? 'bluegrass'
                              : 'red--text'
                          "
                          class="text-uppercase font-weight-black"
                        >
                          <!-- TODO: translate this -->
                          {{ payment.subscription.status }}
                        </div>
                      </div>
                      <div class="mt-5">
                        <h2>{{ $t('billing') }}</h2>
                      </div>
                      <v-divider class="mt-2 mb-3" />
                      <div
                        style="display: flex; align-items: center; justify-content: space-between;"
                        class="mb-2"
                      >
                        <div class="open-sans">{{ $t('amount') }}</div>
                        <div v-if="payment.subscription">
                          USD
                          <!-- TODO: Fix in Braintree (change from 32 to 36 yearly) -->
                          {{ parseInt(payment.subscription.nextBillAmount) }}
                        </div>
                      </div>
                      <div
                        style="display: flex; align-items: center; justify-content: space-between;"
                      >
                        <div class="open-sans">{{ $t('billingCycle') }}</div>
                        <div v-if="payment.subscription">
                          {{
                            payment.subscription.planID === 'cvbaby-yearly'
                              ? $t('yearly')
                              : $t('monthly')
                          }}
                        </div>
                      </div>
                      <div
                        class="mt-5"
                        style="display: flex; align-items: center; justify-content: space-between;"
                      >
                        <h2>{{ $t('paymentMethod') }}</h2>
                        <div>
                          <v-dialog
                            v-model="payment.updatePaymentDialog"
                            max-width="400px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn
                                class="ma-0"
                                color="primary"
                                small
                                depressed
                                v-on="on"
                              >
                                {{ $t('change') }}
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title
                                class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
                              >
                                <span class="cv-dialog-header headline">
                                  {{ $t('updatePaymentMethod') }}
                                </span>
                              </v-card-title>
                              <v-card-text>
                                <v-card
                                  class="cv-payment elevation-0 mx-3 mt-3"
                                >
                                  <v-tabs v-model="payment.tabs" grow>
                                    <v-tab ripple>{{
                                      $t('debitCreditCard')
                                    }}</v-tab>
                                    <v-tab-item>
                                      <payment-fields ref="paymentFields" />
                                    </v-tab-item>
                                    <v-tab ripple>PayPal</v-tab>
                                    <v-tab-item>
                                      <v-container>
                                        <div class="cv-billing-detail">
                                          <div class="font-weight-black">
                                            {{
                                              $t('youWillBeRedirectedToPayPal')
                                            }}
                                          </div>
                                        </div>
                                      </v-container>
                                    </v-tab-item>
                                  </v-tabs>
                                </v-card>
                              </v-card-text>
                              <v-card-actions class="justify-center pb-4">
                                <v-btn
                                  :loading="payment.loading"
                                  :color="
                                    payment.success ? 'success' : 'primary'
                                  "
                                  depressed
                                  @click="updatePaymentMethod"
                                >
                                  <v-icon v-if="payment.success" class="mr-1"
                                    >check_circle</v-icon
                                  >
                                  {{
                                    payment.success
                                      ? $t('updated')
                                      : $t('updateNow')
                                  }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                      </div>
                      <v-divider class="mt-2 mb-3" />
                      <div
                        style="display: flex; align-items: center; justify-content: space-between;"
                        class="mb-2"
                      >
                        <v-chip
                          class="text-uppercase font-weight-bold"
                          color="grey"
                          text-color="white"
                          label
                          disabled
                        >
                          <template v-if="payment.loading">
                            <v-progress-circular
                              :size="20"
                              :width="2"
                              indeterminate
                              color="white"
                              class="mx-4"
                            ></v-progress-circular>
                          </template>
                          <template v-else>
                            <span>{{ payment.method.cardType }}</span>
                            <span class="ml-1">{{ payment.method.last4 }}</span>
                          </template>
                        </v-chip>
                        <v-icon>lock</v-icon>
                      </div>
                      <div
                        style="display: flex; align-items: center; justify-content: space-between;"
                        class="mt-4 mb-2"
                      >
                        <v-spacer />

                        <v-dialog
                          v-model="payment.confirmCancelDialog"
                          max-width="400px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="ma-0 red--text caption"
                              small
                              depressed
                              flat
                              v-on="on"
                            >
                              {{ $t('cancelSubscription') }}
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title
                              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
                            >
                              <span class="cv-dialog-header headline">
                                {{ $t('updatePaymentMethod') }}
                              </span>
                            </v-card-title>
                            <v-card-text class="text-xs-center">
                              <div class="mx-3">
                                <div>{{ $t('areYouSureCancel') }}</div>
                                <div class="mt-3">
                                  <v-icon x-large
                                    >sentiment_very_dissatisfied</v-icon
                                  >
                                </div>
                              </div>
                            </v-card-text>
                            <v-card-actions class="justify-center pb-4">
                              <v-btn
                                :loading="payment.loading"
                                :color="payment.success ? 'success' : 'error'"
                                depressed
                                @click="cancelSubscription"
                              >
                                <v-icon v-if="payment.success" class="mr-1"
                                  >check_circle</v-icon
                                >
                                {{
                                  payment.success
                                    ? $t('subscriptionCancelled')
                                    : $t('cancelSubscription')
                                }}
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container
                      class="pa-5"
                      style="margin: 0; max-width: 600px;"
                    >
                      <h2>{{ $t('invoices') }}</h2>
                      <v-list v-if="payment.subscription" two-line>
                        <v-card
                          v-for="(transaction, index) in payment.subscription
                            .transactions"
                          :key="index"
                        >
                          <v-container class="open-sans">
                            <v-layout row justify-space-between align-center>
                              <div>
                                <div
                                  class="caption grey--text text-uppercase"
                                  style="line-height: 1;"
                                >
                                  {{ $t('date') }}
                                </div>
                                <div class="text-uppercase title">
                                  {{ formatDate(transaction.createdAt) }}
                                </div>
                              </div>
                              <div>
                                <div
                                  class="caption grey--text"
                                  style="line-height: 1;"
                                >
                                  {{ transaction.currencyIsoCode }}
                                </div>
                                <div class="title">
                                  {{ transaction.amount }}
                                </div>
                              </div>
                              <div>
                                <div
                                  class="caption grey--text text-uppercase"
                                  style="line-height: 1;"
                                >
                                  {{ $t('status') }}
                                </div>
                                <div
                                  :class="{
                                    bluegrass: transaction.processorResponseType.match(
                                      'approved'
                                    )
                                  }"
                                  class="text-uppercase title"
                                >
                                  {{
                                    transaction.processorResponseType.match(
                                      'approved'
                                    )
                                      ? $t('approved')
                                      : $t('declined')
                                  }}
                                </div>
                              </div>
                              <div class="text-uppercase title">
                                <v-chip
                                  class="text-uppercase font-weight-bold"
                                  color="grey"
                                  text-color="white"
                                  label
                                  disabled
                                >
                                  <span>{{
                                    transaction.creditCard.cardType
                                  }}</span>
                                  <span class="ml-1">{{
                                    transaction.creditCard.last4
                                  }}</span>
                                </v-chip>
                              </div>
                            </v-layout>
                          </v-container>
                        </v-card>
                      </v-list>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container
                      class="pa-5"
                      style="margin: 0; max-width: 600px;"
                    >
                      <h2>{{ $t('emailNotifications') }}</h2>
                      <v-switch
                        v-model="email.switch"
                        :label="`Switch 1: foobar`"
                        color="primary"
                      ></v-switch>
                    </v-container>
                  </v-tab-item>
                </v-tabs-items>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
      <cv-footer />
    </div>
  </no-ssr>
</template>

<script>
import cvFooter from '~/components/Footer';
import PaymentFields from '~/components/PaymentFields';
export default {
  components: {
    cvFooter,
    PaymentFields
  },
  middleware: 'authenticated',
  data() {
    return {
      tabs: null,
      resumes: {
        loading: false,
        resumes: []
      },
      password: {
        loading: false,
        success: false,
        currentPassword: null,
        newPassword: null,
        newPasswordConfirm: null
      },
      payment: {
        loading: false,
        subscription: null,
        method: {},
        updatePaymentDialog: false,
        confirmCancelDialog: false,
        tabs: null
      },
      email: {
        switch: false
      },
      CVBABY_HOST_DATA: process.env.CVBABY_HOST_DATA
    };
  },
  mounted() {
    // Fetch resumes.
    this.resumes.loading = true;
    this.$store
      .dispatch('api/getResumes')
      .then(resumes => {
        // Add 'resumeImageSource' field to each resume for the UI.
        this.resumes.resumes = resumes.map((resume, index) => {
          return {
            resumeImageSource: `https://${this.CVBABY_HOST_DATA}/users/${
              this.$store.state.cognito.userID
            }/${resume.resumeID}/profile.jpeg`,
            ...resume
          };
        });
      })
      .catch(error => {
        // TODO: Don't log errors in production
        console.error('getResumes error:', error);
        this.$store.dispatch('showSnackbar', {
          color: 'red',
          message: this.$t('errorFetchingResumes')
        });
      })
      .finally(() => {
        this.resumes.loading = false;
      });
    // Fetch subscription.
    this.payment.loading = true;
    this.$store
      .dispatch('api/getSubscription')
      .then(subscription => {
        this.payment.subscription = subscription;
      })
      .then(() => this.$store.dispatch('api/getDefaultPaymentMethod'))
      .then(method => {
        this.payment.method = method;
      })
      .catch(error => {
        const status = ((error || {}).response || {}).status || 500;
        if (status === 406) {
          // 406 signifies a nonexistent subscription.
          return;
        }
        // TODO: Don't log errors in production
        console.error('getSubscription error:', error);
        this.$store.dispatch('showSnackbar', {
          color: 'red',
          message: this.$t('errorFetchingSubscription')
        });
      })
      .finally(() => {
        this.payment.loading = false;
      });
  },
  methods: {
    setImagePlaceholder(index) {
      const resume = this.resumes.resumes[index];
      resume.resumeImageSource = require('~/assets/images/avatarPlaceholder.png');
    },
    changePassword() {
      const {
        currentPassword,
        newPassword,
        newPasswordConfirm
      } = this.password;
      if (!currentPassword || !newPassword || !newPasswordConfirm) {
        // TODO: Show this warning
        console.error('Password fields missing');
        return;
      }
      if (this.password.newPassword !== this.password.newPasswordConfirm) {
        // TODO: Show this warning
        console.error("Passwords don't match");
        return;
      }
      this.password.loading = true;
      this.$store
        .dispatch('cognito/changePassword', {
          currentPassword: this.password.currentPassword,
          newPassword: this.password.newPassword
        })
        .then(() => {
          this.password.loading = false;
          this.password.success = true;
          this.password.currentPassword = null;
          this.password.newPassword = null;
          this.password.newPasswordConfirm = null;
          setTimeout(() => {
            this.password.success = false;
          }, 2000);
        })
        .catch(error => {
          // TODO
          console.error(error);
          this.password.loading = false;
        });
    },
    updatePaymentMethod() {
      this.payment.loading = true;
      this.$refs.paymentFields
        .generateNonce()
        .then(nonce => this.$store.dispatch('api/updatePaymentMethod', nonce))
        .then(method => {
          console.log('method:', JSON.stringify(method, null, 2));
          this.payment.success = true;
          this.payment.method = method;
          setTimeout(() => {
            this.payment.updatePaymentDialog = false;
            this.payment.success = false;
          }, 1500);
        })
        .catch(error => {
          const status = ((error || {}).response || {}).status;
          // TODO
          console.error('updatePaymentMethod() error:', error);
          if (status === 409) {
            this.$store.dispatch('showSnackbar', {
              color: 'red',
              message: this.$t('cardTypeNotAccepted')
            });
          } else {
            this.$store.dispatch('showSnackbar', {
              color: 'red',
              message: this.$t('errorUpdatingPayment')
            });
          }
        })
        .finally(() => {
          this.payment.loading = false;
        });
    },
    cancelSubscription() {
      this.payment.loading = true;
      this.$store
        .dispatch('api/cancelSubscription')
        .then(result => {
          this.$store.dispatch('cognito/setSubscriptionState', '2');
          this.payment.success = true;
          setTimeout(() => {
            this.payment.confirmCancelDialog = false;
            this.payment.success = false;
          }, 1500);
        })
        .catch(error => {
          // TODO
          console.error('cancelSubscription() error:', error);
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorCancellingSubscription')
          });
        })
        .finally(() => {
          this.payment.loading = false;
        });
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString(this.$i18n.locale);
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
.cv-payment
  border: 1px solid #E0E0E0
.vertical-tabs
  overflow: hidden;
  height: 240px
.vertical-tabs--horizontal-text .v-tabs
  transform: rotate(90deg);
  transform-origin: 100px 100px;
  height: 240px;
  left: 40px
.vertical-tabs--horizontal-text .v-tabs >>> .v-tabs__container
  height: 240px;
.vertical-tabs--horizontal-text .v-tabs >>> .v-tabs__div
  width: 48px;
  height: 240px;
  display: inline-block;
.vertical-tabs--horizontal-text .v-tabs >>> .v-tabs__item
  transform: rotate(-90deg);
  transform-origin: 100px 100px;
  width: 240px;
  height: 48px;
  top: 40px
  position: relative
  display: block;
  text-align: left;
  line-height: 36px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
.vertical-tabs--vertical-text
  width: 48px;
.vertical-tabs--vertical-text .v-tabs
  transform: rotate(90deg);
  transform-origin: 24px 24px;
.vertical-tabs--vertical-text .v-tabs >>> .v-tabs__item
  transform: rotate(180deg);
.vertical-tabs--vertical-text .v-tabs >>> .v-tabs__slider-wrapper
  top: 0;
  bottom: auto;
</style>
