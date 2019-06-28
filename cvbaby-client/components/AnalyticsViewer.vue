<template>
  <v-container>
    <v-layout justify-center align-center wrap>
      <v-flex xs12>
        <v-card v-if="sparklineData">
          <v-card-title>
            <div class="pt-3 text-xs-center headline" style="width: 100%;">
              {{ resume.alias }}
            </div>
            <div class="text-xs-center grey--text" style="width: 100%;">
              {{ $t('accessGraph') }}
            </div>
          </v-card-title>
          <v-sheet>
            <v-sparkline
              :smooth="16"
              :gradient="['#f72047', '#ffd200', '#1feaea']"
              :line-width="3"
              :value="sparklineData"
              :labels="sparklineLabels"
              padding="12"
              color="grey"
              auto-draw
              stroke-linecap="round"
              class="cv-sparkline"
            ></v-sparkline>
          </v-sheet>
          <v-img
            v-if="googleMapsImageSource()"
            :src="googleMapsImageSource()"
            class="mt-3"
          />
          <v-expansion-panel class="elevation-0">
            <v-expansion-panel-content
              v-for="(item, index) in filteredAnalytics"
              :key="index"
              :disabled="!item.events.length"
            >
              <template v-slot:header>
                <div>
                  <span class="font-weight-bold">{{ item.date }}</span>
                  <v-chip
                    :color="item.events.length ? 'primary' : 'grey'"
                    text-color="white"
                    >{{ item.events.length }}</v-chip
                  >
                </div>
              </template>
              <v-card class="grey lighten-3">
                <div
                  v-for="(event, _index) in item.events.slice(0, 10)"
                  :key="_index"
                >
                  <div
                    :class="$mq === 'sm' ? 'px-3' : 'px-5'"
                    class="py-3 d-flex justify-space-between align-center"
                  >
                    <div>
                      <div>
                        <span class="font-weight-bold"
                          >{{ $t('country') }}:</span
                        >
                        {{ event.country }}
                      </div>
                      <div>
                        <span class="font-weight-bold">{{ $t('city') }}:</span>
                        {{ event.city }}
                      </div>
                    </div>
                    <div class="text-xs-right font-weight-bold">
                      {{
                        new Date(parseInt(event.stamp)).toLocaleString(
                          $i18n.locale
                        )
                      }}
                    </div>
                  </div>
                  <v-divider />
                </div>
                <!-- eslint-disable-next-line -->
                <div v-html="additionalEventsHTML(item.events)" />
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
        <div v-else class="text-xs-center open-sans title grey--text my-5">
          {{ $t('noDataToShow') }}
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
      const clone = [...this.analytics];
      let hasEvents = false;
      const analytics = clone.reverse().map(({ events }) => {
        if (events.length) {
          hasEvents = true;
        }
        return events.length;
      });
      return hasEvents ? analytics : null;
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
    },
    filteredAnalytics() {
      return this.analytics.filter(({ events }) => !!events.length);
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
    additionalEventsHTML(events) {
      const length = events.slice(10).length;
      if (!length) {
        return '';
      }
      const html =
        '<div class="text-xs-center py-2 caption font-weight-bold grey--text">$</div>';
      return length === 1
        ? html.replace('$', `+ 1 ${this.$t('additionalEvent')}`)
        : html.replace('$', `+ ${length} ${this.$t('additionalEvents')}`);
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
