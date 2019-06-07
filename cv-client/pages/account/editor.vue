<template>
  <no-ssr>
    <v-layout style="min-height: 100vh;" column wrap>
      <v-flex xs12>
        <v-container class="pa-0">
          <navbar />
        </v-container>
      </v-flex>
      <v-flex xs12>
        <v-divider />
      </v-flex>
      <v-flex xs12>
        <v-container class="px-0 pt-0 pb-3">
          <v-toolbar class="elevation-0" style="background-color: #ffffff;">
            <v-btn to="/account" class="mx-0" exact depressed>
              <v-icon>keyboard_arrow_left</v-icon>
              Back to account
            </v-btn>
            <v-spacer />
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
          </v-toolbar>
        </v-container>
      </v-flex>
      <v-flex>
        <v-container grid-list-xl>
          <v-layout v-if="loading" align-center justify-center>
            <v-flex class="text-xs-center" xs12>
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-flex>
          </v-layout>
          <v-layout v-else justify-center align-center wrap>
            <v-flex
              v-for="(resume, index) in resumes"
              :key="index"
              xs12
              sm4
              md3
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
                  <v-card-text>
                    <v-avatar size="100">
                      <v-img
                        :src="require('~/assets/images/testAvatar.jpg')"
                        :lazy-src="''"
                        aspect-ratio="1"
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
                      @click="editResume(index)"
                      >Edit{{ activeIndex === index ? 'ing' : '' }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-badge>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <v-container class="pb-0">
          <v-divider />
        </v-container>
      </v-flex>
      <v-flex xs12>
        <resume-editor
          ref="resumeEditor"
          @save="saveResume"
          @draft="setDraft"
          @remove="removeResume"
          @discard="discardChanges"
        />
      </v-flex>
    </v-layout>
  </no-ssr>
</template>

<script>
import { cloneDeep, omit } from 'lodash';
import Navbar from '~/components/Navbar';
import ResumeEditor from '~/components/ResumeEditor';
import { getDefaultResume } from '~/assets/js/util';
export default {
  components: {
    Navbar,
    ResumeEditor
  },
  data() {
    return {
      resumes: [],
      resumesLastSaved: [],
      draftResume: getDefaultResume(),
      activeIndex: -1,
      loading: false
    };
  },
  computed: {
    draftsRemaining() {
      return (
        this.resumes.map(({ draft }) => draft).filter(x => x).length ||
        this.draftResume.draft
      );
    },
    newResumeButtonText() {
      if (this.draftResume.draft) {
        return `Edit${this.activeIndex === -1 ? 'ing' : ''} Draft`;
      } else {
        return 'New Resume';
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
          // Add 'draft' field to each resume for the UI.
          this.resumes = resumes.map(resume => ({ draft: false, ...resume }));
          this.resumesLastSaved = cloneDeep(this.resumes);

          const index = parseInt(this.$route.query.i);
          if (index >= -1 && index < this.resumes.length) {
            this.editResume(index);
          }
        })
        .catch(() => {
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: 'Error fetching resumes. Please check your connection.'
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
    loadResume(resume) {
      // Load a resume into the editor.
      this.$refs.resumeEditor.loadResume(resume);
      this.activeIndex = resume.index;
    },
    editResume(index) {
      // Pass a resume and index to the loader method.
      if (index === -1) {
        this.loadResume({ index, ...this.draftResume });
        if (!this.draftResume.draft) {
          // If this a brand new resume, focus the 'alias'
          // field to make things obvious for the user.
          this.$refs.resumeEditor.focusAliasField();
        }
      } else {
        this.loadResume({ index, ...this.resumes[index] });
      }
    },
    removeResume(index) {
      // Remove resume from the database.
      this.$store
        .dispatch('api/removeResume', index)
        .then(resumes => {
          // 'resumes' is the updated list of resumes from the database.
          this.loadResume({ index: -1, ...this.draftResume });
          this.resumes.splice(index, 1);
          this.resumesLastSaved.splice(index, 1);
        })
        .catch(() => {
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: 'Error removing resume. Please check your connection.'
          });
        });
    },
    saveResume({ index, ...unsavedResume }) {
      // Save resume to the database.
      // If index is -1, push a new resume onto the
      // resume array on the user object in the database.
      this.$store
        .dispatch('api/saveResume', {
          index,
          resume: omit(unsavedResume, ['draft'])
        })
        .then(savedResume => {
          // savedResume is returned directly from the database.
          const resume = { draft: false, ...savedResume };
          if (index === -1) {
            // Push new resume to resumes array.
            this.resumes.push(resume);
            this.resumesLastSaved.push(cloneDeep(resume));
            // Load newly pushed resume from array.
            this.loadResume({
              index: this.resumes.length - 1,
              ...resume
            });
            // Reset draft resume slot.
            this.draftResume = getDefaultResume();
          } else {
            // Replace the entire array so Vue renders changes within the updated resume object.
            const _resumes = cloneDeep(this.resumes);
            _resumes[index] = resume;
            this.resumes = _resumes;
            this.resumesLastSaved[index] = cloneDeep(resume);
            console.log(JSON.stringify(unsavedResume, null, 2));
            this.loadResume({ index, ...resume });
          }
        })
        .catch(({ response }) => {
          const message =
            response.status === 409
              ? 'Error saving resume: Slug is unavailable.'
              : 'Error saving resume. Please check your connection.';
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message
          });
        });
    },
    discardChanges(index) {
      if (index === -1) {
        // Revert draft resume to default.
        this.draftResume = getDefaultResume();
        this.loadResume({ index, ...this.draftResume });
      } else {
        // Deep clone resume from resumesLastSaved to avoid pointer conflicts.
        const resume = cloneDeep(this.resumesLastSaved[index]);
        // Update the entire array so Vue renders the change.
        const _resumes = cloneDeep(this.resumes);
        _resumes[index] = resume;
        this.resumes = _resumes;
        // Load the reverted resume.
        this.loadResume({ index, ...resume });
      }
    },
    setDraft({ index, ...resume }) {
      // Set resume at the given index to '...resume' from the editor.
      // '...resume' should contain { draft: true }.
      if (index === -1) {
        this.draftResume = resume;
      } else {
        // Update the entire array so Vue renders the draft change.
        const _resumes = cloneDeep(this.resumes);
        _resumes[index] = resume;
        this.resumes = _resumes;
      }
    },
    beforeUnloadHandler(event) {
      // Check if any resumes have not yet been saved before navigating away.
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
