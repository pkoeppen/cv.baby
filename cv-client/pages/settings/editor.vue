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
          <v-layout wrap>
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
import { cloneDeep } from 'lodash';
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
      activeIndex: -1
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
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('beforeunload', this.beforeUnloadHandler);
    }
  },
  methods: {
    loadResume(resume) {
      console.log('loadResume');
      this.$refs.resumeEditor.loadResume(resume);
      this.activeIndex = resume.index;
    },
    editResume(index) {
      console.log('editResume');
      if (index === -1) {
        this.loadResume({ index, ...this.draftResume });
      } else {
        this.loadResume({ index, ...this.resumes[index] });
      }
    },
    removeResume(index) {
      console.log('removeResume');
      // Show confirm remove dialog

      this.loadResume({ index: -1, ...this.draftResume });
      this.resumes.splice(index, 1);
      this.resumesLastSaved.splice(index, 1);
      //
      // TODO: remove from cloud
      //
    },
    saveResume({ index, ...resume }) {
      console.log('saveResume');
      resume.draft = false;
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
        //
        // TODO: push to cloud
        //
      } else {
        // Update the entire array so Vue catches changes within the array.
        const _resumes = cloneDeep(this.resumes);
        _resumes[index] = resume;
        this.resumes = _resumes;
        this.resumesLastSaved[index] = cloneDeep(resume);
        this.loadResume({ index, ...resume });
      }
    },
    saveAll() {
      // TODO
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
        // Update the entire array so Vue catches the draft change.
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
<style lang="stylus" scoped>
.cv-toolbar
  background-color: #ffffff !important
.cv-logo
  span
    letter-spacing: -.03em
  span:nth-child(2)
    color: #2196f3
.cv-payment
  border: 1px solid #E0E0E0
.vertical-tabs
  overflow: hidden;
  height: 240px
.vertical-tabs--horizontal-text .v-tabs
  transform: rotate(90deg);
  transform-origin: 100px 100px;
  height: 240px;
  left: 40px
.vertical-tabs--horizontal-text .v-tabs >>> .v-tabs__container
  height: 240px;
.vertical-tabs--horizontal-text .v-tabs >>> .v-tabs__div
  width: 48px;
  height: 240px;
  display: inline-block;
.vertical-tabs--horizontal-text .v-tabs >>> .v-tabs__item
  transform: rotate(-90deg);
  transform-origin: 100px 100px;
  width: 240px;
  height: 48px;
  top: 40px
  position: relative
  display: block;
  text-align: left;
  line-height: 36px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
.vertical-tabs--vertical-text
  width: 48px;
.vertical-tabs--vertical-text .v-tabs
  transform: rotate(90deg);
  transform-origin: 24px 24px;
.vertical-tabs--vertical-text .v-tabs >>> .v-tabs__item
  transform: rotate(180deg);
.vertical-tabs--vertical-text .v-tabs >>> .v-tabs__slider-wrapper
  top: 0;
  bottom: auto;
</style>
