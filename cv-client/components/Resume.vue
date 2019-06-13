<template>
  <v-container>
    <v-layout justify-center align-center wrap>
      <v-flex xs7 sm5 md4 lg3 class="py-3">
        <div style="position: relative;">
          <v-img
            :src="resumeImageSource"
            :lazy-src="resumeImageSource"
            aspect-ratio="1"
            class="cv-avatar"
            style="border-radius: 50%"
            @error="setImagePlaceholder"
          >
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-layout>
            </template>
          </v-img>
          <template v-if="isDemo">
            <div class="spark-container spark-container-1">
              <div class="spark" />
            </div>
            <div class="spark-container spark-container-2">
              <div class="spark" />
            </div>
            <div class="spark-container spark-container-3">
              <div class="spark" />
            </div>
            <div class="spark-container spark-container-4">
              <div class="spark" />
            </div>
            <div class="spark-container spark-container-5">
              <div class="spark" />
            </div>
            <div class="spark-container spark-container-6">
              <div class="spark" />
            </div>
          </template>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="cv-name text-xs-center font-weight-thin">
          {{ resume.name }}
        </div>
        <div class="cv-title text-xs-center font-weight-thin">
          {{ resume.title }}
        </div>
      </v-flex>
      <v-flex xs12 class="text-xs-center my-3">
        <v-chip
          v-for="(skill, index) in skillsCurated.skills"
          :key="index"
          outline
        >
          {{ skill }}
        </v-chip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-chip
              v-if="skillsCurated.additional.length > 0"
              color="primary"
              text-color="white"
              class="cv-chip-additional"
              v-on="on"
            >
              +{{ skillsCurated.additional.length }}
            </v-chip>
          </template>
          <div
            v-for="(skill, index) in skillsCurated.additional"
            :key="index"
            class="text-xs-center"
          >
            {{ skill }}
          </div>
        </v-tooltip>
      </v-flex>
      <v-flex xs12 sm8 md6>
        <p class="cv-profile font-weight-light text-xs-center my-0">
          {{ resume.profile }}
        </p>
      </v-flex>
      <v-flex xs12 class="my-5">
        <hr style="width: 15%; margin: 0 auto; color: #EEEEEE;" />
      </v-flex>
      <template v-if="employmentItemsOrdered.length">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="cv-section-header" text-color="white">{{
              $t('employment')
            }}</span>
          </v-toolbar>
        </v-flex>
        <v-flex v-if="$mq === 'lg'" class="px-5" xs12 lg10>
          <v-timeline>
            <v-timeline-item
              v-for="(item, index) in employmentItemsOrdered"
              :key="index"
              small
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text`"
                  v-text="formatDates([item.dateFrom, item.dateTo])"
                ></span>
              </template>
              <div class="py-3">
                <h2 :class="`headline font-weight-light mb-1`">
                  {{ item.title }}
                </h2>
                <h4 :class="`text-uppercase mb-3 grey--text text--darken-3`">
                  {{ item.company }}
                </h4>
                <p>{{ item.description }}</p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex v-else xs12 sm9>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(item, index) in employmentItemsOrdered"
              :key="index"
              small
            >
              <v-layout wrap class="pt-3">
                <v-flex class="mb-2" xs12>
                  <strong class="grey--text">{{
                    formatDates([item.dateFrom, item.dateTo])
                  }}</strong>
                </v-flex>
                <v-flex>
                  <strong>{{ item.title }}</strong>
                  <div class="caption mb-2">{{ item.company }}</div>
                  <p>{{ item.description }}</p>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </template>
      <template v-if="educationItemsOrdered.length">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="cv-section-header" text-color="white">{{
              $t('education')
            }}</span>
          </v-toolbar>
        </v-flex>
        <v-flex v-if="$mq === 'lg'" class="px-5" xs12 lg10>
          <v-timeline>
            <v-timeline-item
              v-for="(item, index) in educationItemsOrdered"
              :key="index"
              small
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold grey--text`"
                  v-text="formatDates([item.dateFrom, item.dateTo])"
                ></span>
              </template>
              <div class="py-3">
                <h2 :class="`headline font-weight-light mb-1`">
                  {{ item.university }}
                </h2>
                <h4 :class="`text-uppercase mb-3 grey--text text--darken-3`">
                  {{ item.degree }}
                </h4>
                <p>{{ item.description }}</p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex v-else xs12 sm9>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(item, index) in educationItemsOrdered"
              :key="index"
              small
            >
              <v-layout wrap class="pt-3">
                <v-flex class="mb-2" xs12>
                  <strong class="grey--text">{{
                    formatDates([item.dateFrom, item.dateTo])
                  }}</strong>
                </v-flex>
                <v-flex>
                  <strong>{{ item.university }}</strong>
                  <div class="caption mb-2">{{ item.degree }}</div>
                  <p>{{ item.description }}</p>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </template>
      <template v-if="resume.references.length">
        <v-flex xs12 lg10>
          <v-toolbar dark dense flat class="primary text-xs-center label-wrap">
            <span class="cv-section-header" text-color="white">{{
              $t('references')
            }}</span>
          </v-toolbar>
        </v-flex>
        <v-flex class="py-3 px-4" xs12 lg10>
          <v-container grid-list-xl>
            <v-layout
              row
              wrap
              align-items-center
              justify-center
              fill-height
              class="references-layout"
            >
              <v-flex
                v-for="(reference, index) in resume.references"
                :key="index"
                xs12
                sm6
                md4
              >
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="mx-auto"
                  >
                    <v-card-title class="justify-center">
                      <h3 class="headline">{{ reference.name }}</h3>
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="text-xs-center">
                      <span>
                        {{ reference.title }} at
                        <a :href="reference.companyLink">{{
                          reference.company
                        }}</a>
                      </span>
                      <br />
                      <span>
                        Acquainted
                        <strong>{{ reference.yearsKnown }} years</strong>
                      </span>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions class="justify-center">
                      <v-dialog
                        v-model="resume.references[index].dialog"
                        width="400"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn color="blue" flat v-on="on">
                            Show Contact
                            <v-icon class="pl-1">lock</v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-layout row justify-space-between align-center>
                            <v-flex grow pa-3>
                              <v-card-title class="headline pa-0" primary-title>
                                {{ reference.name }}
                              </v-card-title>
                              <div class="caption pl-1">
                                {{ reference.title }} @
                                <a :href="reference.companyLink">{{
                                  reference.company
                                }}</a>
                              </div>
                            </v-flex>
                            <v-flex shrink pa-3>
                              <v-icon class="green--text">vpn_lock</v-icon>
                            </v-flex>
                          </v-layout>

                          <v-divider />

                          <v-list class="pa-0">
                            <template v-if="reference.phone">
                              <v-list-tile :href="`tel:${reference.phone}`">
                                <v-list-tile-action>
                                  <v-icon>phone</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>
                                    {{ reference.phone }}
                                  </v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-icon>chat</v-icon>
                                </v-list-tile-action>
                              </v-list-tile>
                              <v-divider />
                            </template>

                            <template v-if="reference.email">
                              <v-list-tile :href="`mailto:${reference.email}`">
                                <v-list-tile-action>
                                  <v-icon>mail</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>
                                    {{ reference.email }}
                                  </v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-icon>chat</v-icon>
                                </v-list-tile-action>
                              </v-list-tile>
                              <v-divider />
                            </template>

                            <template v-if="reference.website">
                              <v-list-tile :href="`${reference.website}`">
                                <v-list-tile-action>
                                  <v-icon>public</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                  <v-list-tile-title>
                                    {{ reference.website }}
                                  </v-list-tile-title>
                                </v-list-tile-content>
                              </v-list-tile>
                              <v-divider />
                            </template>
                          </v-list>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              flat
                              @click="resume.references[index].dialog = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </template>
      <template v-if="resume.hobbies.length">
        <v-flex xs12 lg10>
          <v-toolbar
            dark
            dense
            flat
            color="primary"
            class="text-xs-center label-wrap"
          >
            <span class="cv-section-header" text-color="white">{{
              $t('personal')
            }}</span>
          </v-toolbar>
        </v-flex>
        <v-flex class="pa-5" xs12 lg10>
          <v-container grid-list-xl>
            <v-layout
              v-for="(hobby, index) in resume.hobbies"
              :key="index"
              wrap
              align-center
              justify-center
            >
              <v-flex xs2>
                <v-img
                  :src="require(`@/assets/images/hobbies/${hobby.icon}.svg`)"
                  :lazy-src="
                    require(`@/assets/images/hobbies/${hobby.icon}.svg`)
                  "
                  aspect-ratio="1"
                  class="cv-avatar"
                >
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      />
                    </v-layout>
                  </template>
                </v-img>
              </v-flex>
              <v-flex xs10>
                <div>
                  <div class="caption text-uppercase font-weight-bold">
                    {{ hobby.title }}
                  </div>
                  <p class="ma-0">{{ hobby.description }}</p>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </template>
      <template>
        <v-flex xs12 lg10>
          <v-toolbar dark dense flat class="primary text-xs-center label-wrap">
            <span class="cv-section-header" text-color="white">{{
              $t('contact')
            }}</span>
          </v-toolbar>
        </v-flex>
        <v-flex class="pa-5" xs12 sm10 md8 lg6>
          <v-card class="pa-0">
            <v-container class="pa-0">
              <v-layout align-center justify-center wrap>
                <v-flex class="text-xs-center mt-4" xs12>
                  <v-avatar size="200">
                    <v-img
                      :src="resumeImageSource"
                      :lazy-src="resumeImageSource"
                      aspect-ratio="1"
                      class="cv-avatar"
                      style="border-radius: 50%"
                      @error="setImagePlaceholder"
                    >
                      <template v-slot:placeholder>
                        <v-layout fill-height align-center justify-center ma-0>
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          />
                        </v-layout>
                      </template>
                    </v-img>
                  </v-avatar>
                  <div
                    class="cv-name text-xs-center font-weight-thin my-2"
                    style="line-height: 1.2"
                  >
                    {{ resume.name }}
                  </div>
                  <div class="cv-title text-xs-center font-weight-thin">
                    {{ resume.title }}
                  </div>
                  <div v-if="resume.social.length" class="text-xs-center my-4">
                    <span
                      v-for="(platform, index) in resume.social"
                      :key="index"
                    >
                      <a :href="platform.link" class="cv-link">
                        <i :class="`fab fa-facebook-square fa-2x`"></i>
                      </a>
                    </span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <v-list>
                    <v-list-tile
                      v-if="resume.phone"
                      :href="`tel:${resume.phone}`"
                    >
                      <v-list-tile-action>
                        <v-icon>phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{ resume.phone }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon>chat</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-divider inset></v-divider>

                    <v-list-tile
                      v-if="resume.email"
                      :href="`mailto:${resume.email}`"
                    >
                      <v-list-tile-action>
                        <v-icon>mail</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{ resume.email }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon>chat</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-divider inset></v-divider>

                    <v-list-tile
                      v-if="resume.email"
                      :href="`${resume.website}`"
                    >
                      <v-list-tile-action>
                        <v-icon>public</v-icon>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{ resume.website }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { getDefaultResume } from '~/assets/js/util';
export default {
  props: {
    resume: {
      type: Object,
      default: () => getDefaultResume()
    },
    isDemo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resumeImageSource: this.isDemo
        ? require('~/assets/images/avatar.svg')
        : `${process.env.CVBABY_UPLOAD_HOST}/users/${
            this.resume.userID
          }/profile.jpeg`
    };
  },
  computed: {
    skillsCurated() {
      return {
        skills: this.resume.skills.slice(0, 3),
        additional: this.resume.skills.slice(3)
      };
    },
    employmentItemsOrdered() {
      const employmentItems = [...this.resume.employment];
      return employmentItems.sort((a, b) => {
        return new Date(b.dateFrom) - new Date(a.dateFrom);
      });
    },
    educationItemsOrdered() {
      const educationItems = [...this.resume.education];
      return educationItems.sort((a, b) => {
        return new Date(b.dateFrom) - new Date(a.dateFrom);
      });
    }
  },
  methods: {
    setImagePlaceholder(event) {
      // TODO
      console.log('event:', JSON.stringify(event));
    },
    formatDates([dateFrom, dateTo]) {
      const dateFromPretty = new Date(dateFrom).toLocaleString(
        this.$i18n.locale,
        {
          year: 'numeric',
          month: 'long'
          // day: 'numeric'
        }
      );
      const dateToPretty = dateTo
        ? new Date(dateTo).toLocaleString(this.$i18n.locale, {
            year: 'numeric',
            month: 'long'
            // day: 'numeric'
          })
        : this.$t('present');
      return `${dateFromPretty} - ${dateToPretty}`;
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
.cv-section-header
  margin: 0 auto
  text-transform: uppercase
  font-weight: 800
  letter-spacing: 2px
  font-size: 12px
.references-layout
  margin: 0 -24px !important
.spark
  position: absolute
  border-radius: 4px
  height: 6px
  background-color: orange
  animation: explode 1.5s infinite ease-out
.spark-container
  position: absolute
.spark-container-1
  top: 45%
  left: 0
  transform: rotate(-135deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 100ms
.spark-container-2
  top: 45%
  right: 0
  transform: rotate(-45deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 50ms
.spark-container-3
  top: 50%
  left: 0
  transform: rotate(-180deg)
  .spark
    animation-delay: 0ms
.spark-container-4
  top: 50%
  right: 0
  transform: rotate(0deg)
  .spark
    animation-delay: 50ms
.spark-container-5
  bottom: 45%
  left: 0
  transform: rotate(135deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 100ms
.spark-container-6
  bottom: 45%
  right: 0
  transform: rotate(45deg)
  .spark
    animation-name: explode-smaller
    animation-delay: 150ms
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
