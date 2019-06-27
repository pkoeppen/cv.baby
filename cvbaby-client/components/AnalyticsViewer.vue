<template>
  <v-container class="pr-0 pt-0 pl-5">
    <v-layout justify-center align-center wrap>
      <v-flex xs12>
        <v-sheet v-if="sparklineData">
          <v-sparkline
            :smooth="16"
            :gradient="['#f72047', '#ffd200', '#1feaea']"
            :line-width="3"
            :value="sparklineData"
            :labels="sparklineLabels"
            padding="16"
            color="grey"
            auto-draw
            stroke-linecap="round"
            class="cv-sparkline"
          ></v-sparkline>
        </v-sheet>
        <div v-else>No data to show.</div>
        <v-img v-if="googleMapsImageSource()" :src="googleMapsImageSource()" />
        Analytics Length: {{ analytics.length }}

        <div v-for="(item, index) in analytics" :key="index">
          Date:
          {{ item.date }} Events:
          {{ item.events.length }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      resume: {},
      analytics: [],
      googleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY
    };
  },
  computed: {
    sparklineData() {
      const analytics = [...this.analytics];
      return analytics.length === 14
        ? analytics.reverse().map(({ events }) => events.length)
        : null;
    },
    sparklineLabels() {
      const labels = new Array(14)
        .fill(0)
        .map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - index);
          return `${date.getMonth() + 1}.${date.getDate()}`;
        })
        .reverse();
      return labels;
    }
  },
  methods: {
    getTestAnalytics() {
      return new Array(14).fill(0).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        const length = Math.round(Math.random() * 10);
        return Array.from({ length }, () => ({
          timestamp: date.toLocaleString(),
          latitude: '',
          longitude: ''
        }));
      });
    },
    googleMapsImageSource() {
      const markers = this.analytics
        .reduce((acc, cur) => {
          return acc.concat(
            cur.events.map(({ latitude, longitude }) => {
              if (latitude && longitude) {
                return `markers=color:red%7C${latitude},${longitude}`;
              }
            })
          );
        }, [])
        .filter(x => !!x);
      if (!markers.length) {
        return null;
      }
      const params = [
        `size=600x300`,
        `scale=2`,
        `maptype=roadmap`,
        `language=${this.$i18n.locale}`,
        markers.join('&'),
        `key=${this.googleMapsAPIKey}`
      ];
      return `https://maps.googleapis.com/maps/api/staticmap?${params.join(
        '&'
      )}`;
    },
    setImagePlaceholder(event) {
      // Turn off emitPermitted to avoid emitting 'draft'.
      this.emitPermitted = false;
      this.resume.resumeImageSource = require('~/assets/images/avatarPlaceholder.png');
      // Turn emitPermitted back on.
      this.$nextTick(() => (this.emitPermitted = true));
    },
    loadAnalytics({ analytics, ...resume }) {
      this.analytics = analytics;
      this.resume = resume;
    }
  }
};
</script>
<style lang="stylus">
.cv-sparkline
  g
    font-size: 6px !important
</style>
