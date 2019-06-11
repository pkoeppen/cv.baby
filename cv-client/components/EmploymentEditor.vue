<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="text-none" color="primary" flat depressed v-on="on"
            >Add employment</v-btn
          >
        </template>
        <v-form ref="form" lazy-validation @submit="saveEmploymentItem">
          <v-card>
            <v-card-title
              class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
            >
              <span class="cv-dialog-header headline"
                >{{ dialogTitlePrefix }} employment</span
              >
            </v-card-title>
            <v-card-text>
              <v-container class="py-0" grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="employmentItem.dateFrom"
                      :rules="[v => !!v || 'Date is required']"
                      label="Date from"
                      hint="(mm/dd/yyyy)"
                      mask="##/##/####"
                      return-masked-value
                      validate-on-blur
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="employmentItem.dateTo"
                      label="Date to"
                      hint="Leave blank if you still work here"
                      mask="##/##/####"
                      return-masked-value
                      validate-on-blur
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="employmentItem.company"
                      :rules="[v => !!v || 'Company is required']"
                      label="Company"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="employmentItem.title"
                      :rules="[v => !!v || 'Title is required']"
                      label="Title"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="employmentItem.description"
                      :rules="[v => !!v || 'Description is required']"
                      label="Description"
                      rows="2"
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
        v-for="(item, index) in employmentItems"
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
            <v-btn flat @click="editEmploymentItem(item, index)">Edit</v-btn>
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
              >Remove employment item</span
            >
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
            <v-btn color="error" @click="removeEmploymentItem">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-flex>
</template>

<script>
function getDefaultEmploymentItem() {
  return {
    index: -1,
    dateFrom: null,
    dateTo: null,
    title: null,
    company: null,
    description: null
  };
}
export default {
  name: 'EmploymentEditor',
  props: {
    employmentItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      confirmRemoveDialog: false,
      removeIndex: -1,
      employmentItem: getDefaultEmploymentItem()
    };
  },
  computed: {
    dialogTitlePrefix() {
      return this.employmentItem.index < 0 ? 'Add' : 'Edit';
    }
  },
  watch: {
    dialog(value) {
      if (value === false) {
        // Reset employment item on dialog close.
        this.employmentItem = getDefaultEmploymentItem();
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  },
  methods: {
    editEmploymentItem(item, index) {
      // Load item into the employmentItem slot and show the dialog.
      this.employmentItem = { ...item, index };
      this.dialog = true;
    },
    saveEmploymentItem(event) {
      event.preventDefault();
      if (!this.$refs.form.validate()) {
        // Validation failed.
        return;
      }
      const { index, ...item } = this.employmentItem;
      if (index === -1) {
        // Add a new employment item.
        this.employmentItems.push(item);
      } else {
        // Update an existing employment item.
        this.employmentItems[index] = item;
      }
      this.dialog = false;
      this.employmentItem = getDefaultEmploymentItem();
      this.$emit('draft');
    },
    showConfirmRemoveDialog(index) {
      this.removeIndex = index;
      this.confirmRemoveDialog = true;
    },
    removeEmploymentItem() {
      this.employmentItems.splice(this.removeIndex, 1);
      this.confirmRemoveDialog = false;
      this.removeIndex = -1;
    }
  }
};
</script>
