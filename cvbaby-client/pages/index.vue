<template>
  <div>
    <v-container class="pa-0">
      <v-layout column>
        <v-flex class="hidden-lg-and-up pt-5 pb-4">
          <div
            class="cv-ribbon d-flex align-center mx-auto"
            style="position: relative; width: 260px;"
          >
            <div class="cv-ribbon-text white--text text-xs-center px-4">
              <div class="body-1">{{ $t('summerSale') }}</div>
              <div class="rate font-weight-black">
                $3 / {{ $t('abbreviationMonth') }}
              </div>
              <div class="caption">{{ $t('forALimitedTime') }}</div>
            </div>
            <img class="ribbon-left" src="~/assets/images/ribbonLeft.svg" />
            <img class="ribbon-right" src="~/assets/images/ribbonRight.svg" />
          </div>
        </v-flex>
        <v-flex style="position: relative;" xs12 md8>
          <div class="cv-header font-weight-black text-xs-center px-4 mt-4">
            {{ $t('onlineResumesSimplified') }}
          </div>
          <div class="cv-subheader font-weight-light text-xs-center px-4 mt-3">
            {{ $t('anAllInOneSolution') }}
          </div>
          <div class="cv-ribbon-wrapper hidden-md-and-down">
            <div
              class="cv-ribbon d-flex align-center"
              style="position: absolute;"
            >
              <div class="cv-ribbon-text white--text text-xs-right px-4">
                <div class="body-1">{{ $t('summerSale') }}</div>
                <div class="rate font-weight-black">
                  $3 / {{ $t('abbreviationMonth') }}
                </div>
                <div class="caption">{{ $t('forALimitedTime') }}</div>
              </div>
              <img
                class="ribbon-bottom"
                src="~/assets/images/ribbonBottom.svg"
              />
              <img class="ribbon-left" src="~/assets/images/ribbonLeft.svg" />
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <resume :resume="demoResume" is-demo />
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
          <a href="mailto:support@cv.baby">{{ $t('contactUs') }}</a>
        </div>
      </div>
      <div class="mb-5" />
    </v-flex>
    <cv-footer />
  </div>
</template>

<script>
import cvFooter from '~/components/Footer';
import Resume from '~/components/Resume';
import { getDemoResume } from '~/assets/js/util';
export default {
  components: {
    cvFooter,
    Resume
  },
  data() {
    return {
      demoResume: getDemoResume()
    };
  }
};
</script>
<style lang="stylus" scoped>
.cv-footer-background
  .call-to-action
    font-family: 'Open Sans', sans-serif !important
    font-size: 26px
  .questions
    font-family: 'Open Sans', sans-serif !important
  .cv-logo
    font-size: 30px !important
.cv-toolbar
  background-color: #ffffff !important
.cv-logo
  font-size: 28px
  span
    letter-spacing: -.03em
  span:nth-child(2)
    color: #2196f3
.cv-header,
.cv-subheader
  line-height: 1.5em !important
.cv-header
  font-size: 28px
.cv-subheader
  font-size: 20px
  font-family: 'Open Sans', sans-serif !important
.cv-ribbon-wrapper
  position absolute
  left: -140px
  width: 300px
  height: 300px
  top: 230px
.cv-ribbon
  right: 0
  top: 0
  min-width: 200px
  height: 100px
  background-color: #f7931e
  .cv-ribbon-text
    font-family: 'Open Sans', sans-serif !important
    .rate
      font-size: 34px
      font-weight: 900
      line-height: 36px
  img.ribbon-left
    height: 100%
    width: 32px
    position: absolute
    left: -30px
  img.ribbon-right
    height: 100%
    width: 32px
    position: absolute
    right: -30px
  img.ribbon-bottom
    width: 70%
    position: absolute
    top: 100px
    right: 0
.cv-dialog-header *
  font-size: 24px !important
  font-weight: 900 !important
</style>
