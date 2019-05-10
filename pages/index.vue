<template>
  <v-layout column justify-center align-center>
    <v-flex style="position: relative;" xs12 md-8>
      <v-toolbar class="cv-toolbar elevation-0">
        <v-toolbar-title class="cv-logo font-weight-black">
          <span>cv</span><span>baby&nbsp;</span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn class="text-none" color="primary" flat depressed>Login</v-btn>
        <v-btn color="primary" depressed>Free Trial</v-btn>
      </v-toolbar>
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
          <div class="display-1 font-weight-black">$3 / mo</div>
          <div class="caption">For a limited time</div>
        </div>
        <img src="~/assets/images/ribbon.svg" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Resume from '~/components/Resume';
export default {
  components: {
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
    position: absolute
    left: 50px
    top: 20px
    transform: rotate(8deg)
  img
    width: 100%
</style>
