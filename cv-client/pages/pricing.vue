<template>
  <div>
    <v-layout class="cv-background-grey" justify-center align-center wrap>
      <v-flex xs12 md8>
        <v-toolbar class="elevation-0">
          <v-toolbar-title class="cv-logo font-weight-black">
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
      <v-flex class="mt-4 mb-1" xs12 md8>
        <div class="cv-trial-text text-xs-center font-weight-black">
          {{ $t('free14DayTrialForCvBabyPro') }}
          <!-- Free 14-day trial for
          <div class="cv-logo" style="display: inline;">
            <span>cv</span><span>baby</span> pro
          </div> -->
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl fill-height>
          <v-layout justify-center align-center wrap>
            <v-flex xs12 sm6 md4 lg3>
              <v-card class="cv-tier elevation-0 pb-3">
                <v-card-title class="cv-pricing-header" primary-title>
                  <div class="cv-period mb-0 py-3">{{ $t('monthly') }}</div>
                  <br />
                  <div>
                    <div class="cv-price pt-3">9</div>
                  </div>
                  <br />
                  <span class="grey--text text--darken-1">{{
                    $t('perMonth')
                  }}</span>
                  <span class="grey--text text--darken-1">{{
                    $t('cancelAnyTime')
                  }}</span>
                </v-card-title>
                <v-card-text>
                  <v-layout column align-center justify-center>
                    <v-btn
                      color="primary"
                      :to="
                        localePath({
                          name: 'payment',
                          query: { cycle: 'monthly' }
                        })
                      "
                      large
                    >
                      {{ $t('startFreeTrial') }}
                    </v-btn>
                    <v-list class="cv-features pb-4">
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('unlimitedUsage') }}</div>
                      </v-list-tile>
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('twentyFourSevenSupport') }}</div>
                      </v-list-tile>
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('noAds') }}</div>
                      </v-list-tile>
                      <v-list-tile class="grey--text" style="height: 36px">
                        <v-icon class="grey--text mr-2">close</v-icon>
                        <div>{{ $t('shorterLicense') }}</div>
                      </v-list-tile>
                      <v-list-tile class="grey--text" style="height: 36px">
                        <v-icon class="grey--text mr-2">close</v-icon>
                        <div>{{ $t('moreExpensive') }}</div>
                      </v-list-tile>
                    </v-list>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3>
              <v-card class="cv-tier elevation-0 pb-3">
                <div class="cv-award white--text caption font-weight-bold px-2">
                  {{ $t('mostPopular') }}
                </div>
                <v-card-title class="cv-pricing-header" primary-title>
                  <div class="cv-period mb-0 py-3">{{ $t('yearly') }}</div>
                  <br />
                  <div>
                    <div class="cv-price pt-3">3</div>
                  </div>
                  <br />
                  <span class="grey--text text--darken-1">{{
                    $t('perMonth')
                  }}</span>
                  <span class="grey--text text--darken-1">{{
                    $t('cancelAnyTime')
                  }}</span>
                </v-card-title>
                <v-card-text>
                  <v-layout column align-center justify-center>
                    <v-btn
                      color="primary"
                      :to="
                        localePath({
                          name: 'payment',
                          query: { cycle: 'yearly' }
                        })
                      "
                      large
                    >
                      {{ $t('startFreeTrial') }}
                    </v-btn>
                    <v-list class="cv-features pb-4">
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('unlimitedUsage') }}</div>
                      </v-list-tile>
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('twentyFourSevenSupport') }}</div>
                      </v-list-tile>
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('noAds') }}</div>
                      </v-list-tile>
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('extendedLicense') }}</div>
                      </v-list-tile>
                      <v-list-tile style="height: 36px">
                        <v-icon class="bluegrass mr-2">
                          check
                        </v-icon>
                        <div>{{ $t('lessExpensive') }}</div>
                      </v-list-tile>
                    </v-list>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex class="text-xs-center px-3" xs12>
        <h2 class="bluegrass mb-4">
          {{ $t('trustedByOver20ThousandUsers') }}
          <!-- Trusted by over 20 thousand users every month -->
        </h2>
      </v-flex>
      <v-flex class="text-xs-center mt-5 pt-5" style="background: white" xs12>
        <v-container grid-list-xl>
          <v-layout justify-center align-center wrap>
            <v-flex xs12>
              <h1 class="mb-5">
                {{ $t('whatsIncludedWithYourProSubscription') }}
              </h1>
              <v-layout justify-center align-center wrap>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>lock</v-icon>
                  </div>
                  <div>
                    <h3>Foobar Title</h3>
                    <p class="ma-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      tempor incididunt ut labore et dolore magna aliqua. Ut,
                      quis quis nostrud exercitation ullamco laboris nisi ut
                      aliquip.
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>lock</v-icon>
                  </div>
                  <div>
                    <h3>Foobar Title</h3>
                    <p class="ma-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      tempor incididunt ut labore et dolore magna aliqua. Ut,
                      quis quis nostrud exercitation ullamco laboris nisi ut
                      aliquip.
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>lock</v-icon>
                  </div>
                  <div>
                    <h3>Foobar Title</h3>
                    <p class="ma-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      tempor incididunt ut labore et dolore magna aliqua. Ut,
                      quis quis nostrud exercitation ullamco laboris nisi ut
                      aliquip.
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>lock</v-icon>
                  </div>
                  <div>
                    <h3>Foobar Title</h3>
                    <p class="ma-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      tempor incididunt ut labore et dolore magna aliqua. Ut,
                      quis quis nostrud exercitation ullamco laboris nisi ut
                      aliquip.
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>lock</v-icon>
                  </div>
                  <div>
                    <h3>Foobar Title</h3>
                    <p class="ma-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      tempor incididunt ut labore et dolore magna aliqua. Ut,
                      quis quis nostrud exercitation ullamco laboris nisi ut
                      aliquip.
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>lock</v-icon>
                  </div>
                  <div>
                    <h3>Foobar Title</h3>
                    <p class="ma-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      tempor incididunt ut labore et dolore magna aliqua. Ut,
                      quis quis nostrud exercitation ullamco laboris nisi ut
                      aliquip.
                    </p>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="mt-5" xs12>
              <v-btn
                :to="
                  localePath({
                    name: 'payment',
                    query: { cycle: 'yearly' }
                  })
                "
                class="mb-5"
                color="primary"
              >
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  foobar tempor incididunt ut labore et dolore magna aliqua. Ut,
                  quis quis nostrud exercitation ullamco laboris nisi ut
                  aliquip.
                </p>
              </div>
              <div class="mb-5">
                <h3>Some question about the nature of the service?</h3>
                <p class="ma-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  foobar tempor incididunt ut labore et dolore magna aliqua. Ut,
                  quis quis nostrud exercitation ullamco laboris nisi ut
                  aliquip.
                </p>
              </div>
              <div class="mb-5">
                <h3>Some question about the nature of the service?</h3>
                <p class="ma-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  foobar tempor incididunt ut labore et dolore magna aliqua. Ut,
                  quis quis nostrud exercitation ullamco laboris nisi ut
                  aliquip.
                </p>
              </div>
              <div class="mb-5">
                <h3>Some question about the nature of the service?</h3>
                <p class="ma-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  foobar tempor incididunt ut labore et dolore magna aliqua. Ut,
                  quis quis nostrud exercitation ullamco laboris nisi ut
                  aliquip.
                </p>
              </div>
              <div class="mb-5">
                <h3>Some question about the nature of the service?</h3>
                <p class="ma-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  foobar tempor incididunt ut labore et dolore magna aliqua. Ut,
                  quis quis nostrud exercitation ullamco laboris nisi ut
                  aliquip.
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
            <div class="cv-logo font-weight-black" style="display: inline;">
              <span>cv</span><span>baby</span>
              <span>pro</span>
            </div>
          </div>
          <v-btn
            :to="
              localePath({
                name: 'payment',
                query: { cycle: 'yearly' }
              })
            "
            class="my-4"
            color="primary"
            >Get started</v-btn
          >
          <div class="questions">
            Still have questions?
            <a href="mailto:support@cv.baby">Contact us</a>
          </div>
        </div>
        <div class="mb-5" />
      </v-flex>
    </v-layout>
    <cv-footer />
  </div>
</template>

<script>
import cvFooter from '~/components/Footer';
export default {
  components: {
    cvFooter
  }
};
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
  .cv-award
    border-radius: 0 !important
    height: 18px
    position: absolute
    top: 18px
    right: -18px
    background: $bluegrass
    &:before
      content: ''
      position: absolute
      top: 17px
      right: 0
      width: 0
      height: 0
      border-style: solid
      border-width: 18px 18px 0 0
      border-color: $bluegrass-darken transparent transparent transparent
.cv-features
  width: 234px
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
