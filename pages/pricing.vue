<template>
  <v-layout class="cv-background-grey" row justify-center align-center wrap>
    <v-flex xs12 md8>
      <v-toolbar class="elevation-0">
        <v-toolbar-title class="cv-logo font-weight-black">
          <nuxt-link to="/" style="text-decoration: none; color: inherit;">
            <span>cv</span><span>baby&nbsp;</span>
          </nuxt-link>
        </v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs12>
      <v-divider />
    </v-flex>
    <v-flex class="mt-4 mb-1" xs12 md8>
      <div class="cv-trial-text text-xs-center font-weight-black">
        Free 14-day trial for
        <div class="cv-logo" style="display: inline;">
          <span>cv</span><span>baby</span>
        </div>
        pro
      </div>
    </v-flex>
    <v-flex xs12>
      <v-container grid-list-xl fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 md3>
            <v-card class="cv-tier elevation-0 pb-3">
              <v-card-title class="cv-pricing-header" primary-title>
                <div class="cv-period mb-0 py-3">Monthly</div>
                <br />
                <div>
                  <div class="cv-price pt-3">9</div>
                </div>
                <br />
                <span class="grey--text text--darken-1">per month</span>
                <span class="grey--text text--darken-1">cancel any time</span>
              </v-card-title>
              <v-card-text class="text-xs-center py-0">
                <v-btn color="primary" to="/payment" large>
                  Start Free Trial
                </v-btn>
                <v-list class="cv-features pb-4">
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>Unlimited usage</div>
                  </v-list-tile>
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>24/7 support</div>
                  </v-list-tile>
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>No ads</div>
                  </v-list-tile>
                  <v-list-tile class="grey--text" style="height: 36px">
                    <v-icon class="grey--text mr-2">close</v-icon>
                    <div>Shorter license</div>
                  </v-list-tile>
                  <v-list-tile class="grey--text" style="height: 36px">
                    <v-icon class="grey--text mr-2">close</v-icon>
                    <div>More expensive</div>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md3>
            <v-card class="cv-tier elevation-0 pb-3">
              <v-card-title class="cv-pricing-header" primary-title>
                <div class="cv-period mb-0 py-3">Yearly</div>
                <br />
                <div>
                  <div class="cv-price pt-3">3</div>
                </div>
                <br />
                <span class="grey--text text--darken-1">per month</span>
                <span class="grey--text text--darken-1">cancel any time</span>
              </v-card-title>
              <v-card-text class="text-xs-center py-0">
                <v-btn color="primary" to="/payment" large>
                  Start Free Trial
                </v-btn>
                <v-list class="cv-features pb-4">
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>Unlimited usage</div>
                  </v-list-tile>
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>24/7 support</div>
                  </v-list-tile>
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>No ads</div>
                  </v-list-tile>
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>Extended license</div>
                  </v-list-tile>
                  <v-list-tile style="height: 36px">
                    <v-icon class="bluegrass mr-2">
                      check
                    </v-icon>
                    <div>Less expensive</div>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex class="text-xs-center" xs12>
      <h2 class="bluegrass mb-4">
        Trusted by over 20 thousand users every month
      </h2>
    </v-flex>
    <v-flex class="text-xs-center mt-5 pt-5" style="background: white" xs12>
      <v-container grid-list-xl>
        <v-layout justify-center align-center wrap>
          <v-flex xs12>
            <h1 class="mb-5">
              What's included with your Pro subscription
            </h1>
            <v-layout justify-center align-center wrap>
              <v-flex class="cv-feature d-flex text-xs-left px-5 py-4" xs12 md6>
                <div class="pr-4">
                  <v-icon x-large>lock</v-icon>
                </div>
                <div>
                  <h3>Foobar Title</h3>
                  <p class="ma-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                    quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>
                </div>
              </v-flex>
              <v-flex class="cv-feature d-flex text-xs-left px-5 py-4" xs12 md6>
                <div class="pr-4">
                  <v-icon x-large>lock</v-icon>
                </div>
                <div>
                  <h3>Foobar Title</h3>
                  <p class="ma-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                    quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>
                </div>
              </v-flex>
              <v-flex class="cv-feature d-flex text-xs-left px-5 py-4" xs12 md6>
                <div class="pr-4">
                  <v-icon x-large>lock</v-icon>
                </div>
                <div>
                  <h3>Foobar Title</h3>
                  <p class="ma-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                    quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>
                </div>
              </v-flex>
              <v-flex class="cv-feature d-flex text-xs-left px-5 py-4" xs12 md6>
                <div class="pr-4">
                  <v-icon x-large>lock</v-icon>
                </div>
                <div>
                  <h3>Foobar Title</h3>
                  <p class="ma-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                    quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>
                </div>
              </v-flex>
              <v-flex class="cv-feature d-flex text-xs-left px-5 py-4" xs12 md6>
                <div class="pr-4">
                  <v-icon x-large>lock</v-icon>
                </div>
                <div>
                  <h3>Foobar Title</h3>
                  <p class="ma-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                    quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>
                </div>
              </v-flex>
              <v-flex class="cv-feature d-flex text-xs-left px-5 py-4" xs12 md6>
                <div class="pr-4">
                  <v-icon x-large>lock</v-icon>
                </div>
                <div>
                  <h3>Foobar Title</h3>
                  <p class="ma-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                    quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex class="mt-5" xs12>
            <v-btn class="mb-5" color="primary">
              Get started
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider class="my-5" />
      <v-container>
        <v-layout justify-center align-center wrap>
          <v-flex xs12>
            <h1 class="mb-5">
              Frequently asked questions:
            </h1>
          </v-flex>
          <v-flex class="text-xs-left mt-3" xs12 md6>
            <div class="mb-5">
              <h3>Some question about the nature of the service?</h3>
              <p class="ma-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, foobar
                tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
            <div class="mb-5">
              <h3>Some question about the nature of the service?</h3>
              <p class="ma-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, foobar
                tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
            <div class="mb-5">
              <h3>Some question about the nature of the service?</h3>
              <p class="ma-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, foobar
                tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
            <div class="mb-5">
              <h3>Some question about the nature of the service?</h3>
              <p class="ma-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, foobar
                tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
            <div class="mb-5">
              <h3>Some question about the nature of the service?</h3>
              <p class="ma-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, foobar
                tempor incididunt ut labore et dolore magna aliqua. Ut, quis
                quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex style="background: white" xs12>
      <v-divider class="my-5" />
    </v-flex>
    <v-flex class="text-xs-center py-5" style="background: white" xs12>
      <div class="cv-footer-background py-4">
        <div class="call-to-action">
          Subscribe to
          <div class="cv-logo" style="display: inline;">
            <span>cv</span><span>baby</span>
          </div>
          pro
        </div>
        <v-btn class="my-4" color="primary">Get started</v-btn>
        <div class="questions">
          Still have questions?
          <a href="">Contact us</a>
        </div>
      </div>
      <div class="mb-5" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>
<style lang="stylus" scoped>
.cv-background-grey
  background: rgb(245, 245, 245)
.cv-logo
  font-size: 28px
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
.cv-tier
  border: 1px solid #E0E0E0
.cv-features
  div
    font-size: 14px
    font-family: 'Roboto', sans-serif
    font-weight: 900
.cv-feature
  justify-content: center
  align-items: center
.cv-footer-background
  .call-to-action
    font-family: 'Open Sans', sans-serif
    font-size: 26px
  .questions
    font-family: 'Open Sans', sans-serif
</style>
