import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    sm: 600,
    md: 960,
    lg: 1264
  },
  defaultBreakpoint: 'sm'
});
