<template>
  <v-layout column>
    <v-flex xs12>
      <v-container class="pa-0">
        <navbar />
      </v-container>
    </v-flex>
    <v-flex style="position: relative;" xs12 md8>
      <div class="cv-header font-weight-black text-xs-center px-4 mt-4">
        Online resumes, simplified.
      </div>
      <div class="cv-subheader font-weight-light text-xs-center px-4 mt-3">
        An all-in-one solution for CV and resume hosting.
      </div>
      <resume class="mt-4" />
      <div class="cv-ribbon">
        <div class="cv-ribbon-text white--text text-xs-right">
          <div class="body-1">Summer sale!</div>
          <div class="rate font-weight-black">$3 / mo</div>
          <div class="caption">For a limited time</div>
        </div>
        <img src="~/assets/images/ribbon.svg" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Navbar from '~/components/Navbar';
import Resume from '~/components/Resume';
export default {
  components: {
    Navbar,
    Resume
  }
};
</script>
<style lang="stylus" scoped>
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
