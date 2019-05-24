<template>
  <v-layout row justify-center align-center wrap>
    <v-flex xs12 md8>
      <v-toolbar class="cv-toolbar elevation-0">
        <v-toolbar-title
          class="cv-logo font-weight-black"
          style="font-size: 28px"
        >
          <nuxt-link to="/" style="text-decoration: none; color: inherit;">
            <span>cv</span><span>baby&nbsp;</span>
          </nuxt-link>
        </v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs12>
      <v-divider />
    </v-flex>
    <v-flex class="mt-4 mb-2" xs12 md8>
      <div class="cv-trial-text text-xs-center font-weight-black">
        Free 14-day trial for
        <div class="cv-logo" style="display: inline;">
          <span>cv</span><span>baby</span> pro
        </div>
      </div>
    </v-flex>
    <v-flex xs12>
      <v-container grid-list-xl fill-height>
        <v-layout justify-center>
          <v-flex class="px-5" xs12 md5>
            <div class="mb-3">1. Choose a billing cycle</div>
            <v-card class="cv-step elevation-0">
              <v-tabs v-model="activeBillingTypeTab" grow>
                <v-tab ripple>Monthly</v-tab>
                <v-tab-item>
                  <v-container>
                    <div class="cv-billing-detail mb-2">
                      <div class="font-weight-black">
                        First 14 days
                      </div>
                      <div class="font-weight-black text-xs-right">
                        FREE
                      </div>
                    </div>
                    <div class="cv-billing-detail mb-2">
                      <div>
                        Price per month
                      </div>
                      <div class="text-xs-right">
                        USD 9/month
                      </div>
                    </div>
                    <div class="cv-billing-detail mb-2">
                      <div>
                        Billed monthly
                      </div>
                      <div class="text-xs-right">
                        USD 9
                      </div>
                    </div>
                  </v-container>
                </v-tab-item>
                <v-tab ripple>Yearly</v-tab>
                <v-tab-item>
                  <v-container>
                    <div class="cv-billing-detail mb-2">
                      <div class="font-weight-black">
                        First 14 days
                      </div>
                      <div class="font-weight-black text-xs-right">
                        FREE
                      </div>
                    </div>
                    <div class="cv-billing-detail mb-2">
                      <div>
                        Price per month
                      </div>
                      <div class="text-xs-right">
                        USD 3/month
                      </div>
                    </div>
                    <div class="cv-billing-detail mb-2">
                      <div>
                        Billed yearly
                      </div>
                      <div class="text-xs-right">
                        USD 36
                      </div>
                    </div>
                  </v-container>
                </v-tab-item>
              </v-tabs>
            </v-card>
            <div class="mb-3 mt-4">2. Create your account</div>
            <v-text-field label="Email" outline required />
            <v-text-field label="Password" type="password" outline required />
            <div class="mb-3 mt-4">3. Choose payment</div>
            <v-card class="cv-step elevation-0">
              <v-tabs v-model="activePaymentTypeTab" grow>
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
                        You will be redirected to PayPal to finish your payment.
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
              <div>You won't be charged today</div>
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
              <div>Cancel your trial any time before May 31, 2019</div>
            </div>
            <div class="text-xs-center">
              <v-btn class="my-4" color="primary" depressed>
                Start free trial
              </v-btn>
              <div
                class="bluegrass"
                style="font-size: 12px; font-family: 'Open Sans', sans-serif"
              >
                <v-icon class="bluegrass mr-1" style="font-size: 16px">
                  lock
                </v-icon>
                All transactions are secured with SSL encryption
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
                  <div>Unlimited usage</div>
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
                  <div>24/7 support</div>
                </div>
                <div
                  style="display: flex; justify-content: flex-start; align-items: center;"
                >
                  <div>
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                  </div>
                  <div>No ads</div>
                </div>
                <v-divider class="my-4" />
                <div
                  style="display: flex; justify-content: space-between; align-items: center;"
                >
                  <div class="bluegrass font-weight-black">
                    Renews automatically.<br />Cancel anytime.
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
        Having trouble?
        <a href="">Contact us</a>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      activeBillingTypeTab: null,
      activePaymentTypeTab: null
    };
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
