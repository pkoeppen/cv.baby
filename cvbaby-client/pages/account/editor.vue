<template>
  <no-ssr>
    <div>
      <v-layout style="min-height: 100vh;" column>
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
              <div v-if="draftResume && draftResume.draft">
                <v-badge color="error" overlap style="width: 100%;">
                  <template v-slot:badge>
                    <v-icon dark>save</v-icon>
                  </template>
                  <v-btn
                    :disabled="activeIndex === -1 && draftResume.draft"
                    class="mx-0"
                    color="primary"
                    depressed
                    @click="editResume(-1)"
                  >
                    {{ newResumeButtonText }}
                    <v-icon class="ml-1">note_add</v-icon>
                  </v-btn>
                </v-badge>
              </div>
              <v-btn
                v-else
                :disabled="activeIndex === -1 && draftResume.draft"
                class="mx-0"
                color="primary"
                depressed
                @click="editResume(-1)"
              >
                {{ newResumeButtonText }}
                <v-icon class="ml-1">note_add</v-icon>
              </v-btn>
            </v-toolbar>
          </v-container>
        </v-flex>
        <v-flex xs12>
          <v-divider />
        </v-flex>
        <v-flex xs12>
          <v-container class="py-0">
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
                              <v-btn disabled icon
                                ><v-icon small>link</v-icon></v-btn
                              >
                              <v-btn depressed disabled class="ml-2">{{
                                $t('edit')
                              }}</v-btn>

                              <v-btn icon disabled
                                ><v-icon small>file_copy</v-icon></v-btn
                              >
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
                        <v-badge
                          :color="resume.draft ? 'error' : 'success'"
                          overlap
                          style="width: 100%;"
                        >
                          <template v-slot:badge>
                            <v-icon dark>save</v-icon>
                          </template>
                          <v-card class="text-xs-center">
                            <v-card-title
                              :class="{ 'red--text': resume.draft }"
                              class="title justify-center"
                            >
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
                              <v-tooltip v-if="resume.slug" top>
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    :to="
                                      `/${
                                        $i18n.locale === 'en'
                                          ? ''
                                          : $i18n.locale + '/'
                                      }${resume.slug}`
                                    "
                                    icon
                                    v-on="on"
                                    ><v-icon small>link</v-icon></v-btn
                                  >
                                </template>
                                <span>{{ $t('view') }}</span>
                              </v-tooltip>
                              <v-btn
                                depressed
                                :disabled="activeIndex === index"
                                :class="{ 'ml-2': !!resume.slug }"
                                @click="editResume(index)"
                                >{{
                                  activeIndex === index
                                    ? $t('editing')
                                    : $t('edit')
                                }}</v-btn
                              >
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    icon
                                    v-on="on"
                                    @click="cloneResume(index)"
                                    ><v-icon small>file_copy</v-icon></v-btn
                                  >
                                </template>
                                <span>{{ $t('clone') }}</span>
                              </v-tooltip>
                            </v-card-actions>
                          </v-card>
                        </v-badge>
                      </v-flex>
                    </template>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex class="pt-4" xs12 md9>
                <resume-editor
                  ref="resumeEditor"
                  :class="{ 'pr-0 pt-0 pl-5': $mq === 'lg' }"
                  @save="saveResume"
                  @draft="setDraft"
                  @remove="removeResume"
                  @discard="discardChanges"
                />
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
import { cloneDeep, isEqual, omit } from 'lodash';
import cvFooter from '~/components/Footer';
import ResumeEditor from '~/components/ResumeEditor';
import { getDefaultResume } from '~/assets/js/util';
export default {
  components: {
    cvFooter,
    ResumeEditor
  },
  data() {
    return {
      resumes: [],
      resumesLastSaved: [],
      draftResume: getDefaultResume(),
      activeIndex: -1,
      loading: false,
      userID: this.$store.state.cognito.userID,
      CVBABY_HOST_DATA: process.env.CVBABY_HOST_DATA
    };
  },
  computed: {
    draftsRemaining() {
      return (
        this.resumes.map(({ draft }) => draft).filter(x => x).length ||
        !!(this.draftResume || {}).draft
      );
    },
    newResumeButtonText() {
      if ((this.draftResume || {}).draft) {
        return this.activeIndex === -1
          ? this.$t('editingDraft')
          : this.$t('editDraft');
      } else {
        return this.$t('newResume');
      }
    }
  },
  created() {
    if (process.client) {
      // Add beforeunload handler to prevent
      // accidentally discarding unsaved changes.
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('beforeunload', this.beforeUnloadHandler);

      // Fetch resumes from the database.
      this.loading = true;
      this.$store
        .dispatch('api/getResumes')
        .then(resumes => {
          // Add 'draft' and 'resumeImageSource' fields to each resume for the UI.
          this.resumes = resumes.map(resume => {
            // Not necessary here.
            delete resume.userID;
            return {
              draft: false,
              resumeImageSource: `https://${this.CVBABY_HOST_DATA}/users/${
                this.userID
              }/${resume.resumeID}/profile.jpeg`,
              ...resume
            };
          });
          this.resumesLastSaved = cloneDeep(this.resumes);

          const index = parseInt(this.$route.query.i);
          if (index >= -1 && index < this.resumes.length) {
            this.editResume(index);
          }
        })
        .catch(({ response: { status } }) => {
          // TODO: Move this to beforeRouteEnter or something

          if (status >= 400 && status < 500) {
            this.$router.push({ path: this.localePath('index') });
            this.$store.dispatch('cognito/signOut');
            return;
            // TODO: Show 'you have been signed out' snackbar
          }
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorFetchingResumes')
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  destroyed() {
    //
    // TODO: Add 'confirm discard changes?' before leave route
    //
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  },
  methods: {
    /*
     * Loads a resume into the editor.
     */
    loadResume(resume) {
      this.$refs.resumeEditor.loadResume(resume);
      this.activeIndex = resume.index;
    },

    /*
     * Selects a resume by index and loads it.
     */
    editResume(index) {
      // Pass a resume and index to the loader method.
      if (index === -1) {
        this.loadResume({ ...this.draftResume, index });
        if (!this.draftResume.draft) {
          // If this a brand new resume, focus the 'alias'
          // field to make things obvious for the user.
          this.$refs.resumeEditor.focusAliasField();
        }
      } else {
        this.loadResume({ ...this.resumes[index], index });
      }
    },

    /*
     * Removes a resume from database and local arrays.
     */
    removeResume({ index, resumeID }) {
      // Remove resume from the database.
      this.$store
        .dispatch('api/removeResume', resumeID)
        .then(() => {
          // Remove resume from local arrays.
          this.resumes.splice(index, 1);
          this.resumesLastSaved.splice(index, 1);
          this.loadResume({ index: -1, ...this.draftResume });
        })
        .catch(() => {
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorRemovingResume')
          });
        });
    },

    /*
     * Clones an existing resume into the draft slot.
     */
    cloneResume(index) {
      this.draftResume = {
        ...cloneDeep(this.resumes[index]),
        resumeID: null,
        draft: true,
        slug: null
      };
      this.editResume(-1);
    },

    /*
     * Updates an existing resume or creates a new resume in the database.
     */
    async saveResume(
      { index, resumeImageSource, ...unsavedResume },
      hasImage = false
    ) {
      // Save resume to the database.
      const savedResume = await this.$store
        .dispatch('api/saveResume', {
          resume: omit(unsavedResume, ['draft']),
          // Attach base64 image string if present.
          ...(hasImage && { base64Image: resumeImageSource.split(',')[1] })
        })
        .catch(({ response }) => {
          const message =
            response.status === 409
              ? this.$t('errorSavingResumeSlugUnavailable')
              : this.$t('errorSavingResume');
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message
          });
        });
      if (!savedResume) {
        // Something went wrong.
        return;
      }
      // Load the saved resume returned from database.
      const resume = {
        index,
        draft: false,
        resumeImageSource: `https://${this.CVBABY_HOST_DATA}/users/${
          this.userID
        }/${savedResume.resumeID}/profile.jpeg?v=${Date.now()}`,
        ...omit(savedResume, ['userID'])
      };
      if (index === -1) {
        this.setResume(index, resume, true);
        this.editResume(this.resumes.length - 1);
        // Reset draft resume slot.
        this.draftResume = getDefaultResume();
      } else {
        this.setResume(index, resume, true);
        this.editResume(index);
      }
    },

    /*
     * Reverts resume at index back to resumesLastSaved[index].
     */
    discardChanges(index) {
      if (index === -1) {
        // Revert draft resume to default.
        this.draftResume = getDefaultResume();
        this.loadResume({ index, ...this.draftResume });
      } else {
        // Deep clone resume from resumesLastSaved to avoid reference conflicts.
        const resume = this.resumesLastSaved[index];
        this.setResume(index, resume);
        this.loadResume({ index, ...resume });
      }
    },

    /*
     * Updates the local resume array with the given resume draft.
     */
    setDraft({ index, ...resume }) {
      // Set resume at the given index to '...resume' from the editor.
      // '...resume' should contain { draft: true }.
      if (index === -1) {
        if (!isEqual(omit(resume, 'draft'), omit(this.draftResume, 'draft'))) {
          this.draftResume = resume;
        }
      } else if (
        !isEqual(omit(resume, 'draft'), omit(this.resumes[index], 'draft'))
      ) {
        this.setResume(index, resume);
      }
    },

    /*
     * Updates a resume in the local arrays at the given index.
     */
    setResume(index, resume, setLastSaved = false) {
      if (index === -1) {
        // Push new resume to local arrays.
        this.resumes.push(resume);
        this.resumesLastSaved.push(cloneDeep(resume));
      } else {
        // Update the entire array so Vue renders the draft change.
        const _resumes = cloneDeep(this.resumes);
        _resumes[index] = cloneDeep(resume);
        this.resumes = _resumes;
        // Set resume in resumesLastSaved if specified.
        if (setLastSaved) {
          this.resumesLastSaved[index] = cloneDeep(resume);
        }
      }
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
     * Check if any resumes have not been saved before navigating away.
     */
    beforeUnloadHandler(event) {
      if (this.draftResume.draft) {
        event.preventDefault();
      }
      for (const { draft } of this.resumes) {
        if (draft) {
          event.preventDefault();
        }
      }
    }
  }
};
</script>
