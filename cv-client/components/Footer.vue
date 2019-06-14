<template>
  <v-footer height="auto" color="primary lighten-2">
    <v-container class="py-0">
      <v-layout class="caption" justify-space-between align-center>
        <div class="py-3 text-xs-center white--text">
          &copy;2019 — <strong>{{ copyrightHolder }}</strong>
        </div>
        <div
          v-if="isResume"
          class="py-3 text-xs-center white--text"
          v-html="$t('createYourOwnResume')"
        />
        <div v-else class="py-3 text-xs-center white--text">
          <v-menu top offset-y>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-0 caption" flat dark small v-on="on">
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
      default: 'Peter Koeppen'
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
    }
  }
};
</script>
