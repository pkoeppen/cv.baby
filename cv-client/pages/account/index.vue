<template>
  <no-ssr>
    <v-layout style="min-height: 100vh;" column wrap>
      <v-flex xs12>
        <v-container class="pa-0">
          <navbar />
        </v-container>
      </v-flex>
      <v-flex xs12>
        <v-divider />
      </v-flex>
      <v-flex xs12>
        <v-container class="py-0">
          <v-layout row justify-center>
            <v-flex style="border-right: 1px solid #E0E0E0;" shrink>
              <h2 class="mt-5 mb-4">Account</h2>
              <div class="vertical-tabs vertical-tabs--horizontal-text">
                <v-tabs v-model="tabs" @change="$emit('input', $event)">
                  <v-tab>Resumes</v-tab>
                  <v-tab>Password</v-tab>
                  <v-tab>Billing &amp; Subscription</v-tab>
                  <v-tab>Invoices</v-tab>
                  <v-tab>Email Notifications</v-tab>
                </v-tabs>
              </div>
            </v-flex>
            <v-flex>
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <v-container class="py-5 pl-5 pr-0" grid-list-xl>
                    <v-layout wrap>
                      <v-flex
                        v-for="(resume, index) in resumes"
                        :key="index"
                        xs12
                        sm6
                        md4
                      >
                        <v-badge color="success" overlap style="width: 100%;">
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
                                  :src="
                                    require('~/assets/images/testAvatar.jpg')
                                  "
                                  :lazy-src="''"
                                  aspect-ratio="1"
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
                              <v-btn
                                icon
                                depressed
                                :to="`/account/editor?i=${index}`"
                                ><v-icon>edit</v-icon></v-btn
                              >
                              <v-btn
                                icon
                                depressed
                                :to="`/account/analytics?i=${index}`"
                              >
                                <v-icon>trending_up</v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-badge>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-container class="pa-5" style="margin: 0; max-width: 600px">
                    <h2>Change password</h2>
                    <v-text-field
                      v-model="password.currentPassword"
                      prepend-icon="lock"
                      label="Old password"
                      type="password"
                      required
                    />
                    <v-text-field
                      v-model="password.newPassword"
                      prepend-icon="lock"
                      label="New password"
                      type="password"
                      required
                    />
                    <v-text-field
                      v-model="password.newPasswordConfirm"
                      prepend-icon="lock"
                      label="Repeat password"
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
                          ? '&nbsp;Password changed'
                          : 'Change password'
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
                      <h2>Subscription</h2>
                      <v-icon
                        v-if="payment.subscription"
                        :class="
                          payment.subscription.status === 'Active'
                            ? 'bluegrass'
                            : 'red--text'
                        "
                        class="ml-2"
                        style="font-size: 16px;"
                      >
                        play_circle_filled
                      </v-icon>
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
                              ? '(trial)'
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
                        {{ payment.subscription.status }}
                      </div>
                    </div>
                    <div class="mt-5">
                      <h2>Billing</h2>
                    </div>
                    <v-divider class="mt-2 mb-3" />
                    <div
                      style="display: flex; align-items: center; justify-content: space-between;"
                      class="mb-2"
                    >
                      <div class="open-sans">Amount</div>
                      <div v-if="payment.subscription">
                        USD {{ parseInt(payment.subscription.nextBillAmount) }}
                      </div>
                    </div>
                    <div
                      style="display: flex; align-items: center; justify-content: space-between;"
                    >
                      <div class="open-sans">Billing cycle</div>
                      <div v-if="payment.subscription">
                        {{
                          payment.subscription.planId === 'cvbaby-yearly'
                            ? 'Yearly'
                            : 'Monthly'
                        }}
                      </div>
                    </div>
                    <div
                      class="mt-5"
                      style="display: flex; align-items: center; justify-content: space-between;"
                    >
                      <h2>Payment method</h2>
                      <div>
                        <v-dialog v-model="payment.dialog" max-width="400px">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="ma-0"
                              color="primary"
                              small
                              depressed
                              v-on="on"
                            >
                              Change
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title
                              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
                            >
                              <span class="cv-dialog-header headline">
                                Update payment method
                              </span>
                            </v-card-title>
                            <v-card-text>
                              <v-card class="cv-payment elevation-0 ma-3">
                                <v-tabs v-model="payment.tabs" grow>
                                  <v-tab ripple>Debit/Credit Card</v-tab>
                                  <v-tab-item>
                                    <v-container>
                                      credit card fields go here
                                    </v-container>
                                  </v-tab-item>
                                  <v-tab ripple>PayPal</v-tab>
                                  <v-tab-item>
                                    <v-container>
                                      <div class="cv-billing-detail">
                                        <div class="font-weight-black">
                                          You will be redirected to PayPal to
                                          finish your payment.
                                        </div>
                                      </div>
                                    </v-container>
                                  </v-tab-item>
                                </v-tabs>
                              </v-card>
                            </v-card-text>
                            <v-card-actions class="justify-center pb-4">
                              <v-btn
                                color="primary"
                                @click="loginDialog = false"
                              >
                                Update now
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
                      <div class="open-sans">PayPal</div>
                      <v-icon>lock</v-icon>
                    </div>
                    <div
                      style="display: flex; align-items: center; justify-content: space-between;"
                      class="mt-4 mb-2"
                    >
                      <v-spacer />
                      <div class="red--text caption">Cancel subscription</div>
                    </div>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-container
                    class="pa-5"
                    style="margin: 0; max-width: 600px;"
                  >
                    <h2>Invoices</h2>
                    <v-list v-if="payment.subscription" two-line>
                      <v-card
                        v-for="(transaction, index) in payment.subscription
                          .transactions"
                        :key="index"
                      >
                        <v-container class="open-sans">
                          <v-layout row justify-space-between align-center>
                            <v-flex>
                              <div class="grey--text">
                                <div class="caption" style="line-height: 1;">
                                  {{ transaction.currencyIsoCode }}
                                </div>
                                <div class="title">
                                  {{ transaction.amount }}
                                </div>
                              </div>
                            </v-flex>
                            <v-flex>
                              <div class="text-uppercase title">
                                {{ transaction.creditCard.cardType }}
                                {{ transaction.creditCard.last4 }}
                              </div>
                            </v-flex>
                            <v-flex>
                              <div class="text-uppercase title">
                                {{ transaction.createdAt }}
                              </div>
                            </v-flex>
                            <v-flex>
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
                                    ? 'Approved'
                                    : 'Declined'
                                }}
                              </div>
                            </v-flex>
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
                    <h2>Email notifications</h2>
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
  </no-ssr>
</template>

<script>
import Navbar from '~/components/Navbar';
export default {
  components: {
    Navbar
  },
  data() {
    return {
      tabs: null,
      resumes: [],
      password: {
        loading: false,
        success: false,
        currentPassword: null,
        newPassword: null,
        newPasswordConfirm: null
      },
      payment: {
        subscription: null,
        dialog: false,
        tabs: null
      },
      email: {
        switch: false
      }
    };
  },
  mounted() {
    this.$store
      .dispatch('api/getResumes')
      .then(resumes => {
        this.resumes = resumes;
      })
      .catch(() => {
        this.$store.dispatch('showSnackbar', {
          color: 'red',
          message: 'Error fetching resumes. Please check your connection.'
        });
      });
    this.$store
      .dispatch('api/getSubscription')
      .then(subscription => {
        this.payment.subscription = subscription;
      })
      .catch(() => {
        this.$store.dispatch('showSnackbar', {
          color: 'red',
          message: 'Error fetching subscription. Please check your connection.'
        });
      });
  },
  methods: {
    changePassword() {
      const {
        currentPassword,
        newPassword,
        newPasswordConfirm
      } = this.password;
      if (!currentPassword || !newPassword || !newPasswordConfirm) {
        console.error('Password fields missing');
        return;
      }
      if (this.password.newPassword !== this.password.newPasswordConfirm) {
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
          console.error(error);
          this.password.loading = false;
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
