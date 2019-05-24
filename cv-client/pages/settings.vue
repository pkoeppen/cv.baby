<template>
  <v-layout style="min-height: 100vh;" row column wrap>
    <v-flex xs12>
      <v-container class="pa-0">
        <v-toolbar class="cv-toolbar elevation-0">
          <v-toolbar-title
            class="cv-logo font-weight-black"
            style="font-size: 28px"
          >
            <nuxt-link to="/" style="text-decoration: none; color: inherit;">
              <span>cv</span><span>baby&nbsp;</span>
            </nuxt-link>
          </v-toolbar-title>
          <v-spacer />
          <v-btn class="mr-3" color="primary" flat depressed outline small>
            Renew Subscription
          </v-btn>
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
                    <v-list-tile-title>Some Person</v-list-tile-title>
                    <v-list-tile-sub-title>
                      User Of This Site
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
                <v-list-tile @click="alert()">
                  <v-list-tile-avatar>
                    <v-icon>assignment_late</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-title>Help</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="alert()">
                  <v-list-tile-avatar>
                    <v-icon>exit_to_app</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-menu>
        </v-toolbar>
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
              <v-tabs v-model="tabs" @input="$emit('input', $event)">
                <v-tab>Profile</v-tab>
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
                <resume />
              </v-tab-item>
              <v-tab-item>
                <v-container class="pa-5" style="margin: 0; max-width: 600px">
                  <h2>Change password</h2>
                  <v-text-field
                    prepend-icon="lock"
                    label="Old password"
                    type="password"
                    required
                  />
                  <v-text-field
                    prepend-icon="lock"
                    label="New password"
                    type="password"
                    required
                  />
                  <v-text-field
                    prepend-icon="lock"
                    label="Repeat password"
                    type="password"
                    required
                  />
                  <v-btn class="mt-4" color="primary" depressed>
                    Save changes
                  </v-btn>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-container class="pa-5" style="margin: 0; max-width: 600px;">
                  <div style="display: flex; align-items: center;">
                    <h2>Subscription</h2>
                    <v-icon class="bluegrass ml-2" style="font-size: 16px;">
                      play_circle_filled
                    </v-icon>
                  </div>
                  <v-divider class="mt-2 mb-3" />
                  <div
                    style="display: flex; align-items: center; justify-content: space-between;"
                  >
                    <div
                      class="cv-logo font-weight-black"
                      style="display: inline; font-size: 16px;"
                    >
                      <span>cv</span><span>baby</span>
                      pro
                    </div>
                    <div class="text-uppercase font-weight-black bluegrass">
                      ACTIVE
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
                    <div>USD 36</div>
                  </div>
                  <div
                    style="display: flex; align-items: center; justify-content: space-between;"
                  >
                    <div class="open-sans">Billing cycle</div>
                    <div>Yearly</div>
                  </div>
                  <div
                    class="mt-5"
                    style="display: flex; align-items: center; justify-content: space-between;"
                  >
                    <h2>Payment method</h2>
                    <div>
                      <v-dialog v-model="loginDialog" max-width="400px">
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
                            <v-btn color="primary" @click="loginDialog = false">
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
                <v-container class="pa-5" style="margin: 0; max-width: 600px;">
                  <h2>Invoices</h2>
                  <v-list two-line>
                    <v-divider />
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'blah'" />
                        <v-list-tile-sub-title v-html="'blah'" />
                      </v-list-tile-content>
                      <v-list-tile-avatar icon>
                        <v-icon>lock</v-icon>
                      </v-list-tile-avatar>
                    </v-list-tile>
                    <v-divider />
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'blah'" />
                        <v-list-tile-sub-title v-html="'blah'" />
                      </v-list-tile-content>
                      <v-list-tile-avatar icon>
                        <v-icon>lock</v-icon>
                      </v-list-tile-avatar>
                    </v-list-tile>
                  </v-list>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-container class="pa-5" style="margin: 0; max-width: 600px;">
                  <h2>Email notifications</h2>
                  <v-switch
                    v-model="switch1"
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
</template>

<script>
import Resume from '~/components/Resume';
export default {
  components: {
    Resume
  },
  data() {
    return {
      tabs: null
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
