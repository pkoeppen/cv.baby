<template>
  <v-container>
    <v-layout justify-center align-center wrap>
      <v-flex xs12>
        <v-btn color="primary">Save</v-btn>
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
        <v-text-field v-model="resume.name" label="Name" />
        <v-text-field v-model="resume.title" label="Title" />
      </v-flex>
      <v-flex xs12 class="text-xs-center my-3">
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
      <v-flex xs12>
        <v-textarea
          v-model="resume.profile"
          label="Profile"
          hint="A brief synopsis of who you are"
          rows="2"
        ></v-textarea>
      </v-flex>
      <employment-editor :employment-items.sync="resume.employment" />
      <education-editor :education-items.sync="resume.education" />
      <reference-editor :reference-items.sync="resume.references" />
    </v-layout>
  </v-container>
</template>

<script>
import EmploymentEditor from './EmploymentEditor';
import EducationEditor from './EducationEditor';
import ReferenceEditor from './ReferenceEditor';
function getDefaultResume() {
  return {
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
    ReferenceEditor
  },
  props: {
    resumeProp: {
      type: Object,
      default: () => getDefaultResume()
    }
  },
  data() {
    return {
      resume: {
        ...this.resumeProp
      }
    };
  }
};
</script>
<style lang="stylus" scoped></style>
