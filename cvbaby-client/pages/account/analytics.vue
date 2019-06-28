<template>
  <no-ssr>
    <div>
      <v-layout style="min-height: 100vh;" column>
        <v-flex xs12>
          <v-container class="pa-0">
            <navbar />
          </v-container>
        </v-flex>
        <v-flex xs12>
          <v-divider />
        </v-flex>
        <v-flex xs12>
          <v-container class="pa-0">
            <v-toolbar class="elevation-0" style="background-color: #ffffff;">
              <v-btn :to="localePath('account')" class="mx-0" exact depressed>
                <v-icon>keyboard_arrow_left</v-icon>
                {{ $mq === 'sm' ? $t('account') : $t('backToAccount') }}
              </v-btn>
              <v-spacer />
              <v-btn
                class="mx-0"
                color="primary"
                depressed
                :disabled="!resumes[activeIndex]"
                :to="
                  `/${$i18n.locale === 'en' ? '' : $i18n.locale + '/'}${
                    (resumes[activeIndex] || {}).slug
                  }`
                "
              >
                {{ $t('view') }}
                <v-icon class="ml-1" small>launch</v-icon>
              </v-btn>
            </v-toolbar>
          </v-container>
        </v-flex>
        <v-flex xs12>
          <v-divider />
        </v-flex>
        <v-flex>
          <v-container :class="{ 'pr-0': $mq === 'lg' }" class="py-0">
            <v-layout wrap>
              <v-flex
                class="pt-4"
                :style="
                  $mq === 'lg'
                    ? 'min-height: 100vh; border-right: 1px solid #E0E0E0;'
                    : ''
                "
                xs12
                md3
              >
                <v-container
                  :class="{ 'pl-0 pt-0': $mq === 'lg' }"
                  grid-list-xl
                >
                  <v-layout wrap>
                    <template v-if="loading">
                      <v-flex xs12 sm6 md12>
                        <v-badge color="grey" overlap style="width: 100%;">
                          <template v-slot:badge>
                            <v-icon dark>save</v-icon>
                          </template>
                          <v-card class="text-xs-center">
                            <v-card-title
                              class="title justify-center grey--text"
                            >
                              Loading...
                            </v-card-title>
                            <v-card-text style="min-height: 132px;">
                              <v-avatar size="100">
                                <v-progress-circular
                                  color="primary"
                                  indeterminate
                                ></v-progress-circular>
                              </v-avatar>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                              <v-btn depressed disabled class="ml-2">{{
                                $t('viewAnalytics')
                              }}</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-badge>
                      </v-flex>
                    </template>
                    <template v-else>
                      <v-flex
                        v-for="(resume, index) in resumes"
                        :key="index"
                        xs12
                        sm6
                        md12
                      >
                        <v-badge color="success" overlap style="width: 100%;">
                          <template v-slot:badge>
                            <v-icon dark>save</v-icon>
                          </template>
                          <v-card class="text-xs-center">
                            <v-card-title class="title justify-center">
                              {{ resume.alias }}
                            </v-card-title>
                            <v-card-text style="min-height: 132px;">
                              <v-avatar size="100">
                                <v-img
                                  :src="resume.resumeImageSource"
                                  :lazy-src="''"
                                  aspect-ratio="1"
                                  @error="setImagePlaceholder(index)"
                                >
                                  <template v-slot:placeholder>
                                    <v-layout
                                      fill-height
                                      align-center
                                      justify-center
                                      ma-0
                                    >
                                      <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                      />
                                    </v-layout>
                                  </template>
                                </v-img>
                              </v-avatar>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                              <v-btn
                                depressed
                                :disabled="activeIndex === index"
                                @click="loadAnalytics(resume, index)"
                                >{{
                                  activeIndex === index
                                    ? $t('viewingAnalytics')
                                    : $t('viewAnalytics')
                                }}</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-badge>
                      </v-flex>
                    </template>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex xs12 md9>
                <analytics-viewer ref="analyticsViewer" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
      <cv-footer />
    </div>
  </no-ssr>
</template>

<script>
import { cloneDeep } from 'lodash';
import Navbar from '~/components/Navbar';
import cvFooter from '~/components/Footer';
import AnalyticsViewer from '~/components/AnalyticsViewer';
export default {
  components: {
    Navbar,
    cvFooter,
    AnalyticsViewer
  },
  data() {
    return {
      resumes: [],
      loading: false,
      activeIndex: null,
      userID: this.$store.state.cognito.userID,
      uploadHost: process.env.CVBABY_UPLOAD_HOST,
      googleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY
    };
  },
  created() {
    if (process.client) {
      // Fetch analytics from the database.
      this.loading = true;
      this.$store
        .dispatch('api/getAnalytics')
        .then(resumes => {
          // Add 'draft' and 'resumeImageSource' fields to each resume for the UI.
          this.resumes = resumes.map(item => ({
            resumeImageSource: `${this.uploadHost}/users/${this.userID}/${
              item.resumeID
            }/profile.jpeg`,
            ...item
          }));
          console.log(JSON.stringify(resumes, null, 2));
          const index = parseInt(this.$route.query.i);
          if (index >= -1 && index < this.resumes.length) {
            this.loadAnalytics(resumes[index], index);
          }
        })
        .catch(({ response: { status } }) => {
          // TODO: Move this to beforeRouteEnter or something

          // if (status >= 400 && status < 500) {
          //   this.$router.push({ path: this.localePath('index') });
          //   this.$store.dispatch('cognito/signOut');
          //   return;
          //   // TODO: Show 'you have been signed out' snackbar
          // }
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorFetchingAnalytics')
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  methods: {
    /*
     * Loads analytics data into the viewer.
     */
    loadAnalytics(resume, index) {
      this.$refs.analyticsViewer.loadAnalytics(resume);
      this.activeIndex = index;
    },

    /*
     * Fallback for image loading failure.
     */
    setImagePlaceholder(index) {
      const resume = this.resumes[index];
      resume.resumeImageSource = require('~/assets/images/avatarPlaceholder.png');
      this.setResume(index, resume, true);
    },

    /*
     * Updates a resume in the local arrays at the given index.
     */
    setResume(index, resume) {
      // Update the entire array so Vue renders the draft change.
      const _resumes = cloneDeep(this.resumes);
      _resumes[index] = cloneDeep(resume);
      this.resumes = _resumes;
    }
  }
};
</script>
