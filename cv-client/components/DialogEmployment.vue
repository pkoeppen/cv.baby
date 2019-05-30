<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="text-none" color="primary" flat depressed v-on="on"
        >Add employment</v-btn
      >
    </template>
    <v-form @submit="saveEmploymentItem">
      <v-card>
        <v-card-title
          class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
        >
          <span class="cv-dialog-header headline">Add employment</span>
        </v-card-title>
        <v-card-text>
          <v-container class="py-0" grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="employmentItem.dateFrom"
                  label="Date from"
                  hint="(mm/dd/yyyy)"
                  mask="##/##/####"
                  single-line
                  required
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="employmentItem.dateTo"
                  label="Date from"
                  hint="Leave blank if you still work here."
                  mask="##/##/####"
                  single-line
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="employmentItem.university"
                  label="University"
                  single-line
                  required
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="employmentItem.degree"
                  label="Degree"
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
</template>

<script>
function getDefaultEmploymentItem() {
  return {
    dateFrom: null,
    dateTo: null,
    title: null,
    company: null
  };
}
export default {
  name: 'DialogEmployment',
  props: {
    index: {
      type: Number,
      default: null
    },
    employmentItemProp: {
      type: Object,
      default: () => getDefaultEmploymentItem()
    }
  },
  data() {
    return {
      dialog: false,
      employmentItem: {
        ...this.employmentItemProp
      }
    };
  },
  methods: {
    saveEmploymentItem(event) {
      event.preventDefault();
      this.$emit('saveEmploymentItem', this.index, this.employmentItem);
      this.dialog = false;
      this.employmentItem = getDefaultEmploymentItem();
    }
  }
};
</script>
