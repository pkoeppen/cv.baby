<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog v-model="dialog" max-width="600" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="text-none" color="primary" flat depressed v-on="on"
            >Add hobby</v-btn
          >
        </template>
        <v-form ref="form" lazy-validation @submit="saveHobbyItem">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline"
                >{{ dialogTitlePrefix }} hobby</span
              >
            </v-card-title>
            <v-card-text>
              <v-container class="py-0">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="hobbyItem.title"
                      :rules="[v => !!v || 'Hobby title is required']"
                      label="Title"
                      validate-on-blur
                      single-line
                      required
                    />
                  </v-flex>
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
              <v-btn @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" type="submit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-flex>
    <v-layout justify-center align-center wrap>
      <v-flex
        v-for="(item, index) in hobbyItems"
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
            <v-avatar>
              <img :src="require(`@/assets/images/hobbies/${item.icon}.svg`)" />
            </v-avatar>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-center">
            <v-btn flat @click="editHobbyItem(item, index)">Edit</v-btn>
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
            <span class="cv-dialog-header headline">Remove hobby item</span>
          </v-card-title>
          <v-card-text>
            <v-container class="py-0" grid-list-md>
              <v-layout wrap>
                <v-flex class="text-xs-center" xs12>
                  Are you sure you want to remove this item?
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <v-btn @click="confirmRemoveDialog = false">Cancel</v-btn>
            <v-btn color="error" @click="removeHobbyItem">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-flex>
</template>

<script>
import hobbyIcons from '~/assets/js/hobbyIcons';
function getDefaultHobbyItem() {
  return {
    index: -1,
    icon: null,
    title: null
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
      return this.hobbyItem.index < 0 ? 'Add' : 'Edit';
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
