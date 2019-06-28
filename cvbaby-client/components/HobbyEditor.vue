<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog
        v-model="dialog"
        style="display: none;"
        max-width="600"
        persistent
      >
        <template v-slot:activator="{ on }">
          <v-toolbar class="elevation-0 ma-0" dense>
            <v-btn class="text-none" style="margin: 0 auto;" depressed v-on="on"
              >{{ $t('addHobby')
              }}<v-icon class="ml-2" small>library_add</v-icon></v-btn
            >
          </v-toolbar>
        </template>
        <v-form ref="form" lazy-validation @submit="saveHobbyItem">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline">{{
                dialogTitlePrefix
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container class="py-0">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="hobbyItem.title"
                      :rules="[v => !!v || $t('hobbyTitleIsRequired')]"
                      :label="$t('hobbyTitle')"
                      validate-on-blur
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="hobbyItem.description"
                      :rules="[v => !!v || $t('descriptionIsRequired')]"
                      :label="$t('description')"
                      rows="2"
                      required
                    />
                  </v-flex>
                  <div class="mt-3" style="width: 100%" />
                  <v-flex
                    v-for="(icon, index) in hobbyIcons"
                    :key="index"
                    d-flex
                    xs3
                    sm2
                    md1
                  >
                    <div
                      class="d-flex cv-hobby-icon pa-1"
                      :class="{ selected: selectedHobbyIcon === icon }"
                      flat
                      tile
                      @click="selectedHobbyIcon = icon"
                    >
                      <img
                        :src="require(`@/assets/images/hobbies/${icon}.svg`)"
                      />
                    </div>
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
      <template v-for="(hobby, index) in hobbyItems">
        <v-layout :key="index" class="py-2" wrap align-center justify-center>
          <v-flex xs3 sm2 lg1>
            <v-img
              :src="require(`@/assets/images/hobbies/${hobby.icon}.svg`)"
              :lazy-src="require(`@/assets/images/hobbies/${hobby.icon}.svg`)"
              aspect-ratio="1"
              class="cv-avatar"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-layout>
              </template>
            </v-img>
          </v-flex>
          <v-flex xs9 sm7 lg9>
            <div>
              <div class="caption text-uppercase font-weight-bold">
                {{ hobby.title }}
              </div>
              <p class="ma-0">{{ hobby.description }}</p>
            </div>
          </v-flex>
          <v-flex class="text-xs-center text-sm-right" xs12 sm3 lg2>
            <v-btn block depressed @click="editHobbyItem(hobby, index)">{{
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
                    $t('removeHobbyItem')
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
                  <v-btn depressed color="error" @click="removeHobbyItem">{{
                    $t('remove')
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-divider v-if="index + 1 < hobbyItems.length" :key="index" />
      </template>
    </v-container>
  </v-flex>
</template>

<script>
import hobbyIcons from '~/assets/js/hobbyIcons';
function getDefaultHobbyItem() {
  return {
    index: -1,
    icon: null,
    title: null,
    description: null
  };
}
export default {
  name: 'HobbyEditor',
  props: {
    hobbyItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      confirmRemoveDialog: false,
      removeIndex: -1,
      hobbyItem: getDefaultHobbyItem(),
      hobbyIcons: hobbyIcons,
      selectedHobbyIcon: hobbyIcons[0]
    };
  },
  computed: {
    dialogTitlePrefix() {
      return this.hobbyItem.index < 0
        ? this.$t('addHobby')
        : this.$t('editHobby');
    }
  },
  watch: {
    dialog(value) {
      if (value === false) {
        // Reset hobby item on dialog close.
        this.hobbyItem = getDefaultHobbyItem();
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  },
  methods: {
    editHobbyItem(item, index) {
      // Load item into the hobbyItem slot and show the dialog.
      this.hobbyItem = { ...item, index };
      this.selectedHobbyIcon = item.icon;
      this.dialog = true;
    },
    saveHobbyItem(event) {
      event.preventDefault();
      if (!this.$refs.form.validate()) {
        // Validation failed.
        return;
      }

      const { index, ...item } = this.hobbyItem;
      item.icon = this.selectedHobbyIcon;

      if (index === -1) {
        // Add a new hobby item.
        this.hobbyItems.push(item);
      } else {
        // Update an existing hobby item.
        this.hobbyItems[index] = item;
      }
      this.dialog = false;
      this.hobbyItem = getDefaultHobbyItem();
      this.$emit('draft');
    },
    showConfirmRemoveDialog(index) {
      this.removeIndex = index;
      this.confirmRemoveDialog = true;
    },
    removeHobbyItem() {
      this.hobbyItems.splice(this.removeIndex, 1);
      this.confirmRemoveDialog = false;
      this.removeIndex = -1;
    }
  }
};
</script>
<style lang="stylus" scoped>
.cv-hobby-icon
    overflow: hidden
    border-radius: 10px
    border: 2px solid transparent
    &:hover
        cursor: pointer
        border-color: #E0E0E0
    &.selected
        border-color: #E0E0E0
    img
        width: 100%
</style>
