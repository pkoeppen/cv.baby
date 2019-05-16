<template>
  <v-layout row justify-center align-center wrap>
    <v-flex xs12 md8>
      <v-toolbar class="cv-toolbar elevation-0">
        <v-toolbar-title class="cv-logo font-weight-black">
          <span>cv</span><span>baby&nbsp;</span>
        </v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs12>
      <v-divider />
    </v-flex>
    <v-flex xs12 md8>
      <div>foo</div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
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
