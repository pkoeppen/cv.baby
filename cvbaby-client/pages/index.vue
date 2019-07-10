<template>
  <div>
    <v-layout column>
      <v-flex style="position: relative;" xs12 md8>
        <div class="cv-header font-weight-black text-xs-center px-4 mt-4">
          {{ $t('onlineResumesSimplified') }}
        </div>
        <div class="cv-subheader font-weight-light text-xs-center px-4 mt-3">
          {{ $t('anAllInOneSolution') }}
        </div>
        <div class="cv-ribbon">
          <div class="cv-ribbon-text white--text text-xs-right">
            <div class="body-1">{{ $t('summerSale') }}</div>
            <div class="rate font-weight-black">
              $3 / {{ $t('abbreviationMonth') }}
            </div>
            <div class="caption">{{ $t('forALimitedTime') }}</div>
          </div>
          <img src="~/assets/images/ribbon.svg" />
        </div>
      </v-flex>
    </v-layout>
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
.cv-ribbon
  position: absolute
  left: 0
  top: 300px
  width: 200px
  .cv-ribbon-text
    font-family: 'Open Sans', sans-serif !important
    position: absolute
    left: 50px
    top: 20px
    transform: rotate(8deg)
    .rate
      font-size: 34px
      font-weight: 900
      line-height: 36px
  img
    width: 100%
.cv-dialog-header *
  font-size: 24px !important
  font-weight: 900 !important
</style>
