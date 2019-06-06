<template>
  <v-container>
    <v-layout justify-center align-center wrap>
      <v-container class="pa-0" grid-list-xl>
        <v-layout>
          <v-flex xs12 md4>
            <v-btn
              class="ml-0 my-0"
              color="primary"
              :disabled="!resume.draft || !hasAlias"
              depressed
              block
              @click="emitSaveResume"
              >{{ resume.index === -1 ? 'Save Resume' : 'Save Changes' }}</v-btn
            >
          </v-flex>
          <v-flex xs12 md4>
            <v-btn
              class="my-0"
              :disabled="!resume.draft"
              depressed
              block
              @click="emitDiscardChanges"
              >Discard changes</v-btn
            >
          </v-flex>
          <v-flex xs12 md4>
            <v-btn
              :disabled="resume.index === -1"
              class="my-0"
              color="error"
              depressed
              block
              @click="confirmRemoveDialog = true"
              >Remove</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
      <v-flex class="text-xs-center mt-5" xs12>
        <div style="position: relative;">
          <v-avatar size="200">
            <v-img
              :src="require('~/assets/images/testAvatar.jpg')"
              :lazy-src="''"
              aspect-ratio="1"
              class="cv-avatar"
            >
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
        <v-form ref="form" v-model="hasAlias" @submit="e => e.preventDefault()">
          <v-text-field
            ref="alias"
            v-model="resume.alias"
            :rules="[v => !!v || 'Resume alias is required']"
            class="mb-4"
            prepend-inner-icon="bookmark"
            label="Resume alias"
            hint="Give your resume a name"
            required
          />
          <v-text-field
            v-model="resume.slug"
            :rules="[v => !!v || 'Resume slug is required']"
            class="mb-4"
            prepend-inner-icon="link"
            label="Resume slug"
            :hint="
              `https://cv.baby/${resume.slug ? resume.slug : 'your-slug-here'}`
            "
            persistent-hint
            required
          />
        </v-form>
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
    <v-dialog v-model="confirmRemoveDialog" max-width="400">
      <v-card>
        <v-card-title
          class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
        >
          <span class="cv-dialog-header headline">Remove resume</span>
        </v-card-title>
        <v-card-text>
          <v-container class="py-0" grid-list-md>
            <v-layout wrap>
              <v-flex class="text-xs-center" xs12>
                Are you sure you want to remove this resume?
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn @click="confirmRemoveDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="emitRemoveResume">Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      resume: getDefaultResume(),
      confirmRemoveDialog: false,
      hasAlias: false
    };
  },
  created() {
    this.watcher = this.getWatcher();
  },
  methods: {
    loadResume(resume) {
      if (resume.index === -1) {
        this.$refs.form.resetValidation();
      }
      // Turn off watcher to avoid emitting 'draft'.
      this.watcher();
      this.resume = resume;
      // Turn watcher back on.
      this.watcher = this.getWatcher();
    },
    emitSaveResume() {
      if (this.$refs.form.validate()) {
        this.$emit('save', this.resume);
      }
    },
    emitDiscardChanges() {
      this.$refs.form.resetValidation();
      this.$emit('discard', this.resume.index);
    },
    emitRemoveResume() {
      this.confirmRemoveDialog = false;
      this.$emit('remove', this.resume.index);
    },
    emitDraft() {
      this.resume.draft = true;
      this.$emit('draft', this.resume);
    },
    focusAliasField() {
      this.$refs.alias.focus();
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
