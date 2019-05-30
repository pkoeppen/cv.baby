<template>
  <v-container>
    <v-layout row justify-center align-center wrap>
      <v-flex xs12>
        <div style="position: relative;">
          <v-avatar size="200" tile>
            <v-img :src="''" :lazy-src="''" aspect-ratio="1" class="cv-avatar">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-layout>
              </template>
            </v-img>
          </v-avatar>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-text-field v-model="resume.name" label="Name" />
        <v-text-field v-model="resume.title" label="Title" />
      </v-flex>
      <v-flex xs12 class="text-xs-center my-3">
        <v-combobox
          v-model="resume.skills"
          hide-selected
          hint="Enter a maximum of 10 skills"
          label="Skills"
          multiple
        >
          <template v-slot:selection="{ item, parent, selected }">
            <v-chip :color="`grey lighten-3`" :selected="selected" label>
              <span class="pr-2">
                {{ item }}
              </span>
              <v-icon small @click="parent.selectItem(item)">close</v-icon>
            </v-chip>
          </template>
        </v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-textarea
          v-model="resume.profile"
          label="Profile"
          hint="Hint text"
          rows="2"
        ></v-textarea>
      </v-flex>
      <v-flex xs12>
        <dialog-employment @saveEmploymentItem="saveEmploymentItem" />
        Employment items: {{ resume.employment.length }}
        <div v-for="(employmentItem, index) in employmentItems" :key="index">
          {{ JSON.stringify(employmentItem) }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DialogEmployment from './DialogEmployment';
function getDefaultResume() {
  return {
    alias: null,
    name: null,
    title: null,
    email: null,
    phone: null,
    website: null,
    profile: null,
    description: null,
    skills: [],
    employment: [],
    education: [],
    references: [],
    hobbies: [],
    social: []
  };
}
export default {
  components: {
    DialogEmployment
  },
  props: {
    resumeProp: {
      type: Object,
      default: () => getDefaultResume()
    }
  },
  data() {
    return {
      resume: {
        ...this.resumeProp
      }
    };
  },
  computed: {
    employmentItems() {
      return this.resume.employment;
    }
  },
  methods: {
    saveEmploymentItem(index, employmentItem) {
      const i = index > -1 && index < this.resume.employment.length ? index : 0;
      this.resume.employment[i] = employmentItem;
      console.log(this.resume.employment);
    }
  }
};
</script>
<style lang="stylus" scoped>
.cv-name
  font-family: 'Open Sans', sans-serif
  font-size: 44px
.cv-title
  font-family: 'Open Sans', sans-serif
  font-size: 22px
.cv-chip-additional
  background-color: $blue.base !important
  border-color: $blue.base !important
  &:hover
    background-color: $blue.darken-1 !important
    border-color: $blue.darken-1 !important
.cv-profile
  font-size: 18px
.cv-link
  margin: 0 $spacers.one.x
  i
    color: $blue.base
    &:hover
      color: $blue.darken-1
.section-header
  margin: 0 auto
  text-transform: uppercase
  font-weight: 800
  letter-spacing: 1px
.hobbies-layout,
.references-layout
  margin: 0 -24px !important
.paper-wrap-right
  display: none
  position: absolute
  right: -47.9px
  top: 0
  height: 48px
  width: 48px
  background-color: $blue.lighten-1
  &:before
    content: ''
    position: absolute
    top: 48px
    right: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 48px 48px 0 0
    border-color: $blue.darken-2 transparent transparent transparent
.paper-wrap-left
  position: absolute
.label-wrap
  position: relative
  width: calc(100% + 40px)
  left: -20px
  &:before
    content: ''
    position: absolute
    top: 48px
    left: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 0 20px 20px 0
    border-color: transparent $blue.darken-2 transparent transparent
  &:after
    content: ''
    position: absolute
    top: 48px
    right: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 20px 20px 0 0
    border-color: $blue.darken-2 transparent transparent transparent

@media only screen and (min-width: 960px)
  .hobbies-layout,
  .references-layout
    margin: 0 -36px !important

@media only screen and (min-width: 600px)
  @keyframes explode
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 40px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
  @keyframes explode-smaller
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 30px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(170px, 0)
@media only screen and (max-width: 599px)
  @keyframes explode
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 20px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(80px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(80px, 0)
  @keyframes explode-smaller
    0%
      width: 0
      transform: translate(0, 0)
    45%
      width: 20px
      opacity: 1
    70%
      opacity: 0
      width: 0
      transform: translate(100px, 0)
    100%
      opacity: 0
      width: 0
      transform: translate(100px, 0)
</style>
