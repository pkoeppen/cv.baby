<template>
  <v-layout justify-center align-center>
    <v-flex style="position: relative;" xs12 md8>
      <v-toolbar class="cv-toolbar elevation-0">
        <v-toolbar-title class="cv-logo font-weight-black">
          <span>cv</span><span>baby&nbsp;</span>
        </v-toolbar-title>
        <v-spacer />
        <v-dialog v-model="loginDialog" max-width="400px">
          <template v-slot:activator="{ on }">
            <v-btn class="text-none" color="primary" flat depressed v-on="on">
              Login
            </v-btn>
          </template>
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">
                Login
              </span>
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Email" required />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password" type="password" required />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn color="primary" @click="loginDialog = false">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="freeTrialDialog" max-width="400px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">Free Trial</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">
                Try
                <div class="cv-logo" style="display: inline;">
                  <span>cv</span><span>baby</span>
                </div>
                for free
              </span>
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Email" required />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password" type="password" required />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn color="primary" @click="freeTrialDialog = false">
                Start Free Trial
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
          <div class="rate font-weight-black">$3 / mo</div>
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
  },
  data() {
    return {
      freeTrialDialog: false,
      loginDialog: false
    };
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
