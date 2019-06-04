<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="text-none" color="primary" flat depressed v-on="on"
            >Add social link</v-btn
          >
        </template>
        <v-form ref="form" lazy-validation @submit="saveSocialLinkItem">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline"
                >{{ dialogTitlePrefix }} social link</span
              >
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="socialLinkItem.title"
                      label="Link title"
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="socialLinkItem.link"
                      label="URL"
                      validate-on-blur
                      single-line
                      required
                    >
                      <template slot="prepend">
                        <i
                          v-if="socialLinkIconClass"
                          class="v-icon"
                          :class="socialLinkIconClass"
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
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" type="submit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-flex>
    <v-layout justify-center align-center wrap>
      <v-flex
        v-for="(item, index) in socialLinkItems"
        :key="index"
        class="pa-2"
        xs12
        md6
      >
        <v-card>
          <v-card-title class="justify-center">
            <h3 class="headline">{{ index }} - {{ item.title }}</h3>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-xs-center">
            {{ item.link }}
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-center">
            <v-btn flat @click="editSocialLinkItem(item, index)">Edit</v-btn>
            <v-btn color="error" flat @click="showConfirmRemoveDialog(index)"
              >Remove</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog v-model="confirmRemoveDialog" max-width="400">
        <v-card>
          <v-card-title
            class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
          >
            <span class="cv-dialog-header headline"
              >Remove social link item</span
            >
          </v-card-title>
          <v-card-text>
            <v-container class="py-0" grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  Are you sure you want to remove this item?
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <v-btn @click="confirmRemoveDialog = false">Cancel</v-btn>
            <v-btn color="error" @click="removeSocialLinkItem">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
      return this.socialLinkItem.index < 0 ? 'Add' : 'Edit';
    },
    socialLinkIconClass() {
      const link = this.socialLinkItem.link || '';
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
      if (index < 0) {
        // Add a new socialLink item.
        this.socialLinkItems.push(item);
      } else {
        // Update an existing socialLink item.
        this.socialLinkItems[index] = item;
      }
      this.dialog = false;
      this.socialLinkItem = getDefaultSocialLinkItem();
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
