<template>
  <v-footer height="auto" :color="`${color} lighten-2`">
    <v-container class="py-0">
      <v-layout class="caption" align-center>
        <div :class="`${resumeTextColor}--text`" class="py-3 text-xs-center">
          &copy;2019 — <strong>{{ copyrightHolder }}</strong>
        </div>
        <v-spacer />
        <!-- eslint-disable -->
        <div
          v-if="isResume"
          :class="`${resumeTextColor}--text`"
          class="py-3 text-xs-center"
          v-html="$t('createYourOwnResume')"
        />
        <!-- eslint-enable -->
        <template v-else>
          <a
            href="mailto:help@cv.baby"
            class="mr-4"
            style="text-decoration: none; color: white; outline: 0;"
          >
            {{ $t('help') }}
          </a>
          <nuxt-link
            :to="localePath('legal')"
            class="mr-4"
            style="text-decoration: none; color: white; outline: 0;"
          >
            {{ $t('legal') }}
          </nuxt-link>
          <nuxt-link
            :to="localePath('pricing')"
            class="mr-4"
            style="text-decoration: none; color: white; outline: 0;"
          >
            {{ $t('pricing') }}
          </nuxt-link>
          <div class="py-3 text-xs-center white--text">
            <v-menu top offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  :dark="resumeTextColor === 'white'"
                  class="ma-0 caption"
                  flat
                  small
                  v-on="on"
                >
                  <v-icon class="mr-2" small>language</v-icon>
                  {{ currentLocale }}
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  :to="switchLocalePath(locale.code)"
                >
                  <v-list-tile-title>{{ locale.name }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import { find } from 'lodash';
export default {
  name: 'Footer',
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    isResume: {
      type: Boolean,
      default: false
    },
    copyrightHolder: {
      type: String,
      default: 'cvbaby LLC'
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    currentLocale() {
      return find(
        this.$i18n.locales,
        locale => locale.code === this.$i18n.locale
      ).name;
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
    resumeTextColor() {
      const lightColors = ['yellow'];
      return lightColors.indexOf(this.color) > -1 ? 'black' : 'white';
    }
  }
};
</script>
