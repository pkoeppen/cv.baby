<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ on }">
          <v-toolbar class="elevation-0 ma-0" dense>
            <v-btn class="text-none" style="margin: 0 auto;" depressed v-on="on"
              >{{ $t('addSocialLink')
              }}<v-icon class="ml-2" small>library_add</v-icon></v-btn
            >
          </v-toolbar>
        </template>
        <v-form ref="form" lazy-validation @submit="saveSocialLinkItem">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">{{
                dialogTitlePrefix
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="socialLinkItem.title"
                      :rules="[v => !!v || $t('linkTitleIsRequired')]"
                      :label="$t('linkTitle')"
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="socialLinkItem.link"
                      :rules="[v => !!v || $t('urlIsRequired')]"
                      :label="$t('url')"
                      validate-on-blur
                      single-line
                      required
                    >
                      <template slot="prepend">
                        <i
                          v-if="socialLinkIconClass(socialLinkItem.link)"
                          class="v-icon"
                          :class="socialLinkIconClass(socialLinkItem.link)"
                          style="width: 24px;"
                        ></i>
                        <i
                          v-else
                          class="v-icon material-icons theme--light"
                          style="width: 24px;"
                          >link</i
                        >
                      </template>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn depressed @click="dialog = false">{{
                $t('cancel')
              }}</v-btn>
              <v-btn depressed color="primary" type="submit">{{
                $t('save')
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-flex>
    <v-container class="py-0" grid-list-xl>
      <template v-for="(item, index) in socialLinkItems">
        <v-layout :key="index" class="justify-space-between align-center" wrap>
          <v-flex xs6 sm8 lg10>
            <div>
              <i
                v-if="socialLinkIconClass(item.link)"
                class="v-icon"
                :class="socialLinkIconClass(item.link)"
                style="width: 24px;"
              ></i>
              <i
                v-else
                class="v-icon material-icons theme--light"
                style="width: 24px;"
                >link</i
              >
              {{ item.title }}
            </div>
            <div class="font-italic grey--text caption">
              {{ item.link }}
            </div>
          </v-flex>
          <v-flex class="text-xs-center text-sm-right" xs6 sm4 lg2>
            <v-btn block depressed @click="editSocialLinkItem(item, index)">{{
              $t('edit')
            }}</v-btn>
            <v-btn
              color="error"
              block
              depressed
              @click="showConfirmRemoveDialog(index)"
              >{{ $t('remove') }}</v-btn
            >
            <v-dialog v-model="confirmRemoveDialog" max-width="400">
              <v-card>
                <v-card-title
                  class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
                >
                  <span class="cv-dialog-header headline">{{
                    $t('removeSocialLinkItem')
                  }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container class="py-0" grid-list-md>
                    <v-layout wrap>
                      <v-flex class="text-xs-center" xs12>
                        {{ $t('areYouSureYouWantToRemoveThisItem') }}
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions class="justify-center pb-4">
                  <v-btn depressed @click="confirmRemoveDialog = false">{{
                    $t('cancel')
                  }}</v-btn>
                  <v-btn
                    depressed
                    color="error"
                    @click="removeSocialLinkItem"
                    >{{ $t('remove') }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-divider v-if="index + 1 < socialLinkItems.length" :key="index" />
      </template>
    </v-container>
  </v-flex>
</template>

<script>
function getDefaultSocialLinkItem() {
  return {
    index: -1,
    title: null,
    link: null
  };
}
export default {
  name: 'SocialLinkEditor',
  props: {
    socialLinkItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      confirmRemoveDialog: false,
      removeIndex: -1,
      socialLinkItem: getDefaultSocialLinkItem()
    };
  },
  computed: {
    dialogTitlePrefix() {
      return this.socialLinkItem.index < 0
        ? this.$t('addSocialLink')
        : this.$t('editSocialLink');
    }
  },
  watch: {
    dialog(value) {
      if (value === false) {
        // Reset socialLink item on dialog close.
        this.socialLinkItem = getDefaultSocialLinkItem();
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  },
  methods: {
    socialLinkIconClass(link) {
      link = link || '';
      const match = link.match(
        /(facebook|twitter|youtube|instagram|linkedin|tumblr|reddit)\.com/i
      );
      switch (match && match[1]) {
        case 'facebook':
          return 'fab fa-facebook';
        case 'twitter':
          return 'fab fa-twitter';
        case 'youtube':
          return 'fab fa-youtube';
        case 'instagram':
          return 'fab fa-instagram';
        case 'linkedin':
          return 'fab fa-linkedin';
        case 'tumblr':
          return 'fab fa-tumblr';
        case 'reddit':
          return 'fab fa-reddit';
        default:
          return '';
      }
    },
    editSocialLinkItem(item, index) {
      // Load item into the socialLinkItem slot and show the dialog.
      this.socialLinkItem = { ...item, index };
      this.dialog = true;
    },
    saveSocialLinkItem(event) {
      event.preventDefault();
      if (!this.$refs.form.validate()) {
        // Validation failed.
        return;
      }
      const { index, ...item } = this.socialLinkItem;
      if (index === -1) {
        // Add a new socialLink item.
        this.socialLinkItems.push(item);
      } else {
        // Update an existing socialLink item.
        this.socialLinkItems[index] = item;
      }
      this.dialog = false;
      this.socialLinkItem = getDefaultSocialLinkItem();
      this.$emit('draft');
    },
    showConfirmRemoveDialog(index) {
      this.removeIndex = index;
      this.confirmRemoveDialog = true;
    },
    removeSocialLinkItem() {
      this.socialLinkItems.splice(this.removeIndex, 1);
      this.confirmRemoveDialog = false;
      this.removeIndex = -1;
    }
  }
};
</script>
