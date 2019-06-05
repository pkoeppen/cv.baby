<template>
  <v-container>
    <v-layout justify-center align-center wrap>
      <v-flex xs12>
        <v-btn
          class="ml-0"
          color="primary"
          :disabled="!resume.draft"
          depressed
          @click="saveResume"
          >{{ resume.index === -1 ? 'Save Resume' : 'Save Changes' }}</v-btn
        >
        <v-btn :disabled="!resume.draft" depressed @click="discardChanges"
          >Discard changes</v-btn
        >
        <v-btn
          v-if="resume.index !== -1"
          color="error"
          depressed
          @click="removeResume"
          >Remove</v-btn
        >
      </v-flex>
      <v-flex xs12>
        <v-text-field v-model="resume.alias" label="Alias" />
      </v-flex>
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
      <v-flex xs12 md10>
        <v-text-field v-model="resume.name" label="Name" />
        <v-text-field v-model="resume.title" label="Title" />
        <v-text-field v-model="resume.email" label="Email" />
        <v-text-field v-model="resume.phone" label="Phone" />
        <v-text-field v-model="resume.website" label="Website" />
      </v-flex>
      <v-flex xs12 md10 class="text-xs-center my-3">
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
      <v-flex xs12 md10>
        <v-textarea
          v-model="resume.profile"
          label="Profile"
          hint="A brief synopsis of who you are"
          rows="2"
        ></v-textarea>
      </v-flex>
      <employment-editor
        :employment-items.sync="resume.employment"
        @draft="emitDraft"
      />
      <education-editor
        :education-items.sync="resume.education"
        @draft="emitDraft"
      />
      <reference-editor
        :reference-items.sync="resume.references"
        @draft="emitDraft"
      />
      <hobby-editor :hobby-items.sync="resume.hobbies" @draft="emitDraft" />
      <social-link-editor
        :social-link-items.sync="resume.social"
        @draft="emitDraft"
      />
    </v-layout>
  </v-container>
</template>

<script>
import EmploymentEditor from './EmploymentEditor';
import EducationEditor from './EducationEditor';
import ReferenceEditor from './ReferenceEditor';
import HobbyEditor from './HobbyEditor';
import SocialLinkEditor from './SocialLinkEditor';
import { getDefaultResume } from '~/assets/js/util';
export default {
  components: {
    EmploymentEditor,
    EducationEditor,
    ReferenceEditor,
    HobbyEditor,
    SocialLinkEditor
  },
  data() {
    return {
      resume: getDefaultResume()
    };
  },
  created() {
    this.watcher = this.getWatcher();
  },
  methods: {
    loadResume(resume) {
      // Turn off watcher to avoid emitting 'draft'.
      this.watcher();
      this.resume = resume;
      // Turn watcher back on.
      this.watcher = this.getWatcher();
    },
    saveResume() {
      this.$emit('save', this.resume);
    },
    discardChanges() {
      this.$emit('discard', this.resume.index);
    },
    removeResume() {
      this.$emit('remove', this.resume.index);
    },
    emitDraft() {
      this.resume.draft = true;
      this.$emit('draft', this.resume);
    },
    getWatcher() {
      return this.$watch('resume', () => this.emitDraft(), { deep: true });
    },
    getRandomKey() {
      return Math.random()
        .toString(36)
        .substring(2);
    }
  }
};
</script>
<style lang="stylus" scoped></style>
