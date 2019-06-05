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
        <v-container class="px-0 pt-0 pb-2">
          <v-toolbar class="elevation-0" style="background-color: #ffffff;">
            <v-btn to="/settings" class="mx-0" exact depressed>
              <v-icon>keyboard_arrow_left</v-icon>
              Back to settings
            </v-btn>
            <v-spacer />
            <v-btn :disabled="!draftsRemaining" depressed @click="saveAll"
              >Save all</v-btn
            >
            <v-btn
              class="mx-0"
              :color="draftResume.draft ? 'error' : 'primary'"
              depressed
              @click="editResume(-1)"
            >
              {{ draftResume.draft ? 'Edit Draft' : 'New Resume' }}
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
          <v-layout v-else wrap>
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
                <v-card>
                  <v-card-title
                    :class="{ 'red--text': resume.draft }"
                    class="title justify-center"
                  >
                    {{ resume.alias }}
                  </v-card-title>
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
    }
  },
  watch: {
    resumes: {
      handler(a) {
        console.log('resumes changed');
      },
      deep: true
    },
    resumesLastSaved: {
      handler(a) {
        console.log('resumesLastSaved changed');
      },
      deep: true
    }
  },
  created() {
    // If browser, add beforeunload handler to prevent
    // accidentally discarding unsaved changes.
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('beforeunload', this.beforeUnloadHandler);
    }
    // Fetch resumes from database.
    this.loading = true;
    this.$store
      .dispatch('api/getResumes')
      .then(resumes => {
        // Add 'draft' field to each resume for the UI.
        this.resumes = resumes.map(resume => ({ draft: false, ...resume }));
        this.resumesLastSaved = cloneDeep(this.resumes);
      })
      .finally(() => {
        this.loading = false;
      });
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
      } else {
        this.loadResume({ index, ...this.resumes[index] });
      }
    },
    removeResume(index) {
      //
      // TODO: Show confirm remove dialog
      //
      this.loadResume({ index: -1, ...this.draftResume });
      this.resumes.splice(index, 1);
      this.resumesLastSaved.splice(index, 1);
      //
      // TODO: remove from cloud
      //
    },
    saveResume({ index, ...unsavedResume }) {
      // Save resume to database.
      // If index is -1, push a new resume onto the
      // resume array on the user object in the database.
      this.$store
        .dispatch('api/saveResume', {
          index,
          resume: omit(unsavedResume, ['draft'])
        })
        .then(savedResume => {
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
            this.loadResume({ index, ...resume });
          }
        })
        .catch(error => {
          //
          // TODO
          //
          console.error(error);
        });
    },
    saveAll() {
      //
      // TODO
      //
    },
    discardChanges(index) {
      console.log('discardChanges');
      if (index === -1) {
        this.draftResume = getDefaultResume();
        this.loadResume({ index, ...this.draftResume });
      } else {
        const resume = cloneDeep(this.resumesLastSaved[index]);
        const _resumes = cloneDeep(this.resumes);
        _resumes[index] = resume;
        this.resumes = _resumes;
        this.loadResume({ index, ...resume });
      }
    },
    setDraft({ index, ...resume }) {
      console.log('setDraft');
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
      // Check if any resumes have not yet been saved.
      for (const { draft } of this.resumes) {
        if (draft) {
          event.preventDefault();
        }
      }
    }
  }
};
</script>
