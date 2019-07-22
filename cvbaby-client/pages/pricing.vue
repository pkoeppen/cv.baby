<template>
  <div>
    <no-ssr>
      <navbar />
    </no-ssr>
    <v-layout class="cv-background-grey" justify-center align-center wrap>
      <v-flex xs12>
        <v-divider />
      </v-flex>
      <v-flex class="mt-4 mb-1" xs12 md8>
        <!-- eslint-disable -->
        <div
          class="cv-trial-text text-xs-center font-weight-bold"
          v-html="$t('free14DayTrialForCvBabyPro')"
        />
        <!-- eslint-enable -->
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl fill-height>
          <v-layout justify-center align-center wrap>
            <v-flex xs12 sm6 md4 lg3>
              <v-card class="cv-tier elevation-0 pb-3">
                <v-card-title class="cv-pricing-header" primary-title>
                  <div class="cv-period mb-0 py-3">{{ $t('monthly') }}</div>
                  <div>
                    <div class="cv-price pt-3">9</div>
                  </div>
                  <span class="grey--text text--darken-1">{{
                    $t('perMonth')
                  }}</span>
                  <span class="grey--text text--darken-1 text-lowercase">{{
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
                <ribbon :text="$t('mostPopular')" left />
                <v-card-title class="cv-pricing-header" primary-title>
                  <div class="cv-period mb-0 py-3">{{ $t('yearly') }}</div>
                  <div>
                    <div class="cv-price pt-3">3</div>
                  </div>
                  <span class="grey--text text--darken-1">{{
                    $t('perMonth')
                  }}</span>
                  <span class="grey--text text--darken-1 text-lowercase">{{
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
                    <v-icon x-large>cloud_done</v-icon>
                  </div>
                  <div>
                    <h3>{{ $t('featureUnlimitedAccess') }}</h3>
                    <p class="ma-0">
                      {{ $t('featureDescriptionUnlimitedAccess') }}
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>file_copy</v-icon>
                  </div>
                  <div>
                    <h3>{{ $t('featureMultipleResumes') }}</h3>
                    <p class="ma-0">
                      {{ $t('featureDescriptionMultipleResumes') }}
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>money_off</v-icon>
                  </div>
                  <div>
                    <h3>{{ $t('featureNoAds') }}</h3>
                    <p class="ma-0">
                      {{ $t('featureDescriptionNoAds') }}
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>save</v-icon>
                  </div>
                  <div>
                    <h3>{{ $t('featureSaveAsPDF') }}</h3>
                    <p class="ma-0">
                      {{ $t('featureDescriptionSaveAsPDF') }}
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>bar_chart</v-icon>
                  </div>
                  <div>
                    <h3>{{ $t('featureAnalytics') }}</h3>
                    <p class="ma-0">
                      {{ $t('featureDescriptionAnalytics') }}
                    </p>
                  </div>
                </v-flex>
                <v-flex
                  class="cv-feature d-flex text-xs-left px-5 py-4"
                  xs12
                  md6
                >
                  <div class="pr-4">
                    <v-icon x-large>verified_user</v-icon>
                  </div>
                  <div>
                    <h3>{{ $t('featureCustomEndpoint') }}</h3>
                    <p class="ma-0">
                      {{ $t('featureDescriptionCustomEndpoint') }}
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
                {{ $t('faq') }}
              </h1>
            </v-flex>
            <v-flex class="text-xs-left mt-3" xs12 md6>
              <div class="mb-5">
                <h3>{{ $t('faqAutomaticRenewal') }}</h3>
                <p class="ma-0">
                  {{ $t('faqAnswerAutomaticRenewal') }}
                </p>
              </div>
              <div class="mb-5">
                <h3>{{ $t('faqHowCanIPay') }}</h3>
                <p class="ma-0">
                  {{ $t('faqAnswerHowCanIPay') }}
                </p>
              </div>
              <div class="mb-5">
                <h3>{{ $t('faqHowCanICancel') }}</h3>
                <p class="ma-0">
                  {{ $t('faqAnswerHowCanICancel') }}
                </p>
              </div>
              <div class="mb-5">
                <h3>{{ $t('faqPrivateResume') }}</h3>
                <p class="ma-0">
                  {{ $t('faqAnswerPrivateResume') }}
                </p>
              </div>
              <div class="mb-5">
                <h3>{{ $t('faqFeatureRequests') }}</h3>
                <!-- eslint-disable -->
                <p class="ma-0" v-html="$t('faqAnswerFeatureRequests')" />
                <!-- eslint-enable -->
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
          <!-- eslint-disable -->
          <div class="call-to-action" v-html="$t('subscribeToCvBabyPro')" />
          <!-- eslint-enable -->
          <v-btn
            :to="
              localePath({
                name: 'payment',
                query: { cycle: 'yearly' }
              })
            "
            class="my-4"
            color="primary"
            >{{ $t('getStarted') }}</v-btn
          >
          <div class="questions">
            {{ $t('stillHaveQuestions') }}
            <a href="mailto:help@cv.baby">{{ $t('contactUs') }}</a>
          </div>
        </div>
        <div class="mb-5" />
      </v-flex>
    </v-layout>
    <cv-footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';
import Ribbon from '~/components/Ribbon';
import cvFooter from '~/components/Footer';
export default {
  components: {
    Navbar,
    Ribbon,
    cvFooter
  }
};
</script>
<style lang="stylus" scoped>
.cv-background-grey
  background: rgb(245, 245, 245)
.cv-trial-text
  font-size: 28px
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
    font-family: 'Open Sans', sans-serif !important
    font-size: 26px
  .questions
    font-family: 'Open Sans', sans-serif !important
  .cv-logo
    font-size: 30px !important
</style>
