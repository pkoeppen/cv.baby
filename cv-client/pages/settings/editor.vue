<template>
  <no-ssr>
    <div>
      <v-btn to="/settings">
        Back to settings
      </v-btn>
      <div v-for="(resume, index) in resumes" :key="index">
        <div class="title">Resume #{{ index }}</div>
        <v-btn @click="editResume(index)">Edit</v-btn>
        <v-btn @click="removeResume(index)">Remove</v-btn>
      </div>
      <resume-editor :resume="activeResume" @save="saveResume" />
    </div>
  </no-ssr>
</template>

<script>
import ResumeEditor from '~/components/ResumeEditor';
export default {
  components: {
    ResumeEditor
  },
  data() {
    return {
      resumes: [],
      activeResume: undefined
    };
  },
  methods: {
    editResume(index) {
      this.activeResume = { index, ...this.resumes[index] };
      console.log('loading index', index);
    },
    removeResume(index) {
      console.log('removing');
    },
    saveResume({ index, ...resume }) {
      console.log('saving index:', index);
      if (index < 0) {
        this.resumes.push(resume);
        // TODO: push to cloud
      } else {
        this.resumes[index] = resume;
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
