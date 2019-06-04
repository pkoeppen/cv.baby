<template>
  <v-container>
    <v-layout justify-center align-center wrap>
      <v-flex xs12>
        <v-btn color="primary" :disabled="!changed" @click="saveResume">{{
          index === -1 ? 'Save New' : 'Save Changes'
        }}</v-btn>
        <v-btn @click="reset">Reset</v-btn>
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
      <v-flex xs12>
        <v-text-field v-model="name" label="Name" />
        <v-text-field v-model="title" label="Title" />
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="phone" label="Phone" />
        <v-text-field v-model="website" label="Website" />
      </v-flex>
      <v-flex xs12 class="text-xs-center my-3">
        <v-combobox
          v-model="skills"
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
          v-model="profile"
          label="Profile"
          hint="A brief synopsis of who you are"
          rows="2"
        ></v-textarea>
      </v-flex>
      <employment-editor :employment-items.sync="employment" />
      <education-editor :education-items.sync="education" />
      <reference-editor :reference-items.sync="references" />
      <hobby-editor :hobby-items.sync="hobbies" />
      <social-link-editor :social-link-items.sync="social" />
    </v-layout>
  </v-container>
</template>

<script>
import EmploymentEditor from './EmploymentEditor';
import EducationEditor from './EducationEditor';
import ReferenceEditor from './ReferenceEditor';
import HobbyEditor from './HobbyEditor';
import SocialLinkEditor from './SocialLinkEditor';
function getDefaultResume() {
  return {
    index: -1,
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
    EmploymentEditor,
    EducationEditor,
    ReferenceEditor,
    HobbyEditor,
    SocialLinkEditor
  },
  props: {
    resume: {
      type: Object,
      default: () => getDefaultResume()
    }
  },
  data() {
    return {
      changed: false,
      ...this.resume
    };
  },
  watch: {
    resume(resume) {
      for (const key in resume) {
        this[key] = resume[key];
      }
    },

    //

    alias() {
      if (this.index !== -1) {
        this.$emit('change', this.index);
      }
    },
    name() {
      this.changed = true;
      console.log('name changed');
    },
    title() {
      this.changed = true;
      console.log('title changed');
    },
    email() {
      this.changed = true;
      console.log('email changed');
    },
    phone() {
      this.changed = true;
      console.log('phone changed');
    },
    website() {
      this.changed = true;
      console.log('website changed');
    },
    profile() {
      this.changed = true;
      console.log('profile changed');
    },
    description() {
      this.changed = true;
      console.log('description changed');
    },
    skills() {
      this.changed = true;
      console.log('skills changed');
    },
    employment() {
      this.changed = true;
      console.log('employment changed');
    },
    education() {
      this.changed = true;
      console.log('education changed');
    },
    references() {
      this.changed = true;
      console.log('references changed');
    },
    hobbies() {
      this.changed = true;
      console.log('hobbies changed');
    },
    social() {
      this.changed = true;
      console.log('social changed');
    }
  },
  methods: {
    saveResume() {
      const resume = getDefaultResume();
      for (const key in resume) {
        resume[key] = this[key];
      }
      this.$emit('save', resume);
    },
    reset() {
      const resume = getDefaultResume();
      for (const key in resume) {
        this[key] = resume[key];
      }
    }
  }
};
</script>
<style lang="stylus" scoped></style>
