<template>
  <v-container>
    <v-layout justify-center align-center wrap>
      <v-container class="pa-0" grid-list-xl>
        <v-layout wrap>
          <v-flex xs12 sm4>
            <v-btn
              class="ml-0 my-0"
              color="primary"
              :disabled="!resume.draft || !hasAlias || !hasSlug"
              depressed
              block
              @click="emitSaveResume"
              >{{
                resume.index === -1 ? $t('saveResume') : $t('saveChanges')
              }}</v-btn
            >
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn
              class="my-0"
              :disabled="!resume.draft"
              depressed
              block
              @click="emitDiscardChanges"
              >{{ $t('discardChanges') }}</v-btn
            >
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn
              :disabled="resume.index === -1"
              class="my-0"
              color="error"
              depressed
              block
              @click="confirmRemoveDialog = true"
              >{{ $t('remove') }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
      <v-flex class="mt-5" xs12 md8>
        <v-layout justify-space-between align-center>
          <div>
            <v-switch v-model="resume.live" label="Live" color="primary" />
          </div>
          <div>
            <v-menu top offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ma-0 caption"
                  :color="resume.color"
                  depressed
                  small
                  dark
                  v-on="on"
                >
                  Color
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="(color, index) in resumeColors"
                  :key="index"
                  @click="resume.color = color.id"
                >
                  <v-list-tile-title :class="`${color.id}--text`"
                    ><v-icon class="mr-2" :class="`${color.id}--text`"
                      >format_color_fill</v-icon
                    >{{ color.name }}</v-list-tile-title
                  >
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-layout>
      </v-flex>
      <v-flex class="text-xs-center" xs12 md8>
        <div style="position: relative;">
          <v-avatar size="200" @click="$refs.imageInput.click()">
            <v-img
              :src="resume.resumeImageSource"
              :lazy-src="resume.resumeImageSource"
              aspect-ratio="1"
              class="cv-avatar"
              @error="setImagePlaceholder"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-layout>
              </template>
            </v-img>
          </v-avatar>
          <input
            ref="imageInput"
            type="file"
            accept=".jpg, .jpeg, .png"
            hidden
            @change="setImagePreview"
          />
        </div>
      </v-flex>
      <v-flex xs12 md8>
        <v-form
          ref="formAlias"
          v-model="hasAlias"
          @submit="e => e.preventDefault()"
        >
          <v-text-field
            ref="alias"
            :value="resume.alias"
            :rules="[v => !!v || $t('resumeAliasIsRequired')]"
            prepend-inner-icon="bookmark"
            :label="$t('resumeAlias')"
            :hint="$t('giveYourResumeAName')"
            required
            @change="v => (resume.alias = v)"
          />
        </v-form>
        <v-form
          ref="formSlug"
          v-model="hasSlug"
          class="mb-5"
          @submit="e => e.preventDefault()"
        >
          <v-text-field
            :value="resume.slug"
            :rules="[
              v => !!v || $t('resumeSlugIsRequired'),
              v => (!!v && slugAvailable) || $t('slugIsTaken')
            ]"
            prepend-inner-icon="link"
            :label="$t('resumeSlug')"
            :hint="
              `https://cv.baby/${
                resume.slug ? resume.slug : $t('yourSlugHere')
              }`
            "
            persistent-hint
            required
            @change="
              v => {
                resume.slug = v;
                checkSlugAvailable(v);
              }
            "
          >
            <template v-slot:append>
              <v-icon :color="slugFieldAppendIconColor">{{
                slugFieldAppendIcon
              }}</v-icon>
            </template>
          </v-text-field>
        </v-form>
        <v-text-field
          :value="resume.name"
          :label="$t('name')"
          @change="v => (resume.name = v)"
        />
        <v-text-field
          :value="resume.title"
          :label="$t('title')"
          @change="v => (resume.title = v)"
        />
        <v-text-field
          :value="resume.email"
          :label="$t('email')"
          @change="v => (resume.email = v)"
        />
        <v-text-field
          :value="resume.phone"
          :label="$t('phone')"
          @change="v => (resume.phone = v)"
        />
        <v-text-field
          :value="resume.website"
          :label="$t('website')"
          @change="v => (resume.website = v)"
        />
      </v-flex>
      <v-flex xs12 md8 class="text-xs-center my-3">
        <v-combobox
          v-model="resume.skills"
          hide-selected
          :hint="$t('enterAMaximumOf10Skills')"
          :label="$t('skills')"
          multiple
        >
          <!-- TODO: Set maximum 10 skills -->
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
      <v-flex xs12 md8>
        <v-textarea
          :value="resume.profile"
          :label="$t('profile')"
          :hint="$t('aBriefSynopsisOfWhoYouAre')"
          rows="2"
          @change="v => (resume.profile = v)"
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
          <span class="cv-dialog-header headline">{{
            $t('removeResume')
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="py-0" grid-list-md>
            <v-layout wrap>
              <v-flex class="text-xs-center" xs12>
                {{ $t('areYouSureYouWantToRemove') }}
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn @click="confirmRemoveDialog = false">{{ $t('cancel') }}</v-btn>
          <v-btn color="error" @click="emitRemoveResume">{{
            $t('remove')
          }}</v-btn>
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
      hasAlias: false,
      hasSlug: false,
      slugAvailable: true,
      emitPermitted: true,
      CVBABY_UPLOAD_HOST: process.env.CVBABY_UPLOAD_HOST
    };
  },
  computed: {
    slugFieldAppendIcon() {
      if (this.resume.slug) {
        if (this.slugAvailable) {
          return 'check';
        } else {
          return 'close';
        }
      } else {
        return '';
      }
    },
    slugFieldAppendIconColor() {
      if (this.slugAvailable) {
        return 'success';
      } else {
        return 'error';
      }
    },
    resumeColors() {
      return [
        { name: 'Red', id: 'red' },
        { name: 'Pink', id: 'pink' },
        { name: 'Purple', id: 'purple' },
        { name: 'Deep Purple', id: 'deep-purple' },
        { name: 'Indigo', id: 'indigo' },
        { name: 'Blue', id: 'blue' },
        { name: 'Light Blue', id: 'light-blue' },
        { name: 'Cyan', id: 'cyan' },
        { name: 'Teal', id: 'teal' },
        { name: 'Green', id: 'green' },
        { name: 'Light Green', id: 'light-green' },
        { name: 'Lime', id: 'lime' },
        { name: 'Yellow', id: 'yellow' },
        { name: 'Amber', id: 'amber' },
        { name: 'Orange', id: 'orange' },
        { name: 'Deep Orange', id: 'deep-orange' },
        { name: 'Brown', id: 'brown' },
        { name: 'Blue-Grey', id: 'blue-grey' },
        { name: 'Grey', id: 'grey' }
      ];
    }
  },
  watch: {
    resume: {
      handler() {
        this.emitDraft();
      },
      deep: true
    }
  },
  methods: {
    setImagePlaceholder(event) {
      // Turn off emitPermitted to avoid emitting 'draft'.
      this.emitPermitted = false;
      this.resume.resumeImageSource = require('~/assets/images/avatarPlaceholder.png');
      // Turn emitPermitted back on.
      this.$nextTick(() => (this.emitPermitted = true));
    },
    checkSlugAvailable() {
      if (!this.resume.slug) {
        return;
      }
      this.$store
        .dispatch('api/checkSlugAvailable', this.resume.slug)
        .then(available => {
          this.slugAvailable = available;
          this.$refs.formSlug.validate();
        })
        .catch(() => {
          this.$store.dispatch('showSnackbar', {
            color: 'red',
            message: this.$t('errorCheckingSlugAvailability')
          });
        });
    },
    emitSaveResume() {
      if (this.$refs.formAlias.validate() && this.$refs.formSlug.validate()) {
        const hasImage = /^data:image/.test(this.resume.resumeImageSource);
        this.$emit('save', this.resume, hasImage);
      }
    },
    emitDiscardChanges() {
      this.$emit('discard', this.resume.index);
    },
    emitRemoveResume() {
      this.confirmRemoveDialog = false;
      this.$emit('remove', this.resume);
    },
    emitDraft() {
      if (this.emitPermitted) {
        this.resume.draft = true;
        this.$emit('draft', this.resume);
      }
    },
    focusAliasField() {
      this.$refs.alias.focus();
    },
    loadResume(resume) {
      // Turn off emitPermitted to avoid emitting 'draft'.
      this.emitPermitted = false;
      this.slugAvailable = true;
      this.$refs.formAlias.resetValidation();
      this.$refs.formSlug.resetValidation();
      if (resume.index === -1) {
        this.setImagePlaceholder();
      }
      this.resume = resume;
      // Turn emitPermitted back on.
      this.$nextTick(() => (this.emitPermitted = true));
    },
    setImagePreview(event) {
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
          this.resume.resumeImageSource = event.target.result;
          this.emitDraft();
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>
