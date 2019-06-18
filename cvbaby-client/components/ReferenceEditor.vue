<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="text-none" color="primary" flat depressed v-on="on"
            >Add reference</v-btn
          >
        </template>
        <v-form ref="form" lazy-validation @submit="saveReferenceItem">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline"
                >{{ dialogTitlePrefix }} reference</span
              >
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.name"
                      :rules="[v => !!v || 'Name is required']"
                      label="Name"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.title"
                      :rules="[v => !!v || 'Title is required']"
                      label="Title"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.company"
                      :rules="[v => !!v || 'Company is required']"
                      label="Company"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.phone"
                      label="Phone"
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.email"
                      label="Email"
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.yearsKnown"
                      :rules="[
                        v => !!v || 'Years known is required',
                        v => !isNaN(v) || 'Must be a number'
                      ]"
                      label="Years known"
                      single-line
                      required
                    />
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
        v-for="(item, index) in referenceItems"
        :key="index"
        class="pa-2"
        xs12
        md6
      >
        <v-card>
          <v-card-title class="justify-center">
            <h3 class="headline">{{ index }} - {{ item.company }}</h3>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-xs-center">
            {{ item.dateFrom }} - {{ item.dateTo || 'present' }}
            {{ item.title }}
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-center">
            <v-btn flat @click="editReferenceItem(item, index)">Edit</v-btn>
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
            <span class="cv-dialog-header headline">Remove reference</span>
          </v-card-title>
          <v-card-text>
            <v-container class="py-0" grid-list-md>
              <v-layout wrap>
                <v-flex class="text-xs-center" xs12>
                  Are you sure you want to remove this reference?
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <v-btn @click="confirmRemoveDialog = false">Cancel</v-btn>
            <v-btn color="error" @click="removeReferenceItem">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-flex>
</template>

<script>
function getDefaultReferenceItem() {
  return {
    index: -1,
    name: null,
    title: null,
    company: null,
    phone: null,
    email: null,
    yearsKnown: null
  };
}
export default {
  name: 'ReferenceEditor',
  props: {
    referenceItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      confirmRemoveDialog: false,
      removeIndex: -1,
      referenceItem: getDefaultReferenceItem()
    };
  },
  computed: {
    dialogTitlePrefix() {
      return this.referenceItem.index < 0 ? 'Add' : 'Edit';
    }
  },
  watch: {
    dialog(value) {
      if (value === false) {
        // Reset reference item on dialog close.
        this.referenceItem = getDefaultReferenceItem();
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    },
    confirmRemoveDialog(value) {
      if (value === false) {
        this.removeIndex = null;
      }
    }
  },
  methods: {
    editReferenceItem(item, index) {
      // Load item into the referenceItem slot and show the dialog.
      this.referenceItem = { ...item, index };
      this.dialog = true;
    },
    saveReferenceItem(event) {
      event.preventDefault();
      if (!this.$refs.form.validate()) {
        // Validation failed.
        return;
      }
      const { index, ...item } = this.referenceItem;
      if (index === -1) {
        // Add a new reference item.
        this.referenceItems.push(item);
      } else {
        // Update an existing reference item.
        this.referenceItems[index] = item;
      }
      this.dialog = false;
      this.referenceItem = getDefaultReferenceItem();
      this.$emit('draft');
    },
    showConfirmRemoveDialog(index) {
      this.removeIndex = index;
      this.confirmRemoveDialog = true;
    },
    removeReferenceItem() {
      this.referenceItems.splice(this.removeIndex, 1);
      this.confirmRemoveDialog = false;
      this.removeIndex = -1;
    }
  }
};
</script>
