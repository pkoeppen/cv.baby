<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog
        v-model="dialog"
        style="display: none;"
        max-width="400"
        persistent
      >
        <template v-slot:activator="{ on }">
          <v-toolbar class="elevation-0 ma-0" dense>
            <v-btn class="text-none" style="margin: 0 auto;" depressed v-on="on"
              >{{ $t('addEmployment')
              }}<v-icon class="ml-2" small>library_add</v-icon></v-btn
            >
          </v-toolbar>
        </template>
        <v-form ref="form" lazy-validation @submit="saveEmploymentItem">
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
                      v-model="employmentItem.dateFrom"
                      :rules="[v => !!v || $t('dateIsRequired')]"
                      :label="$t('dateFrom')"
                      :hint="$t('mmddyyyy')"
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
                      :label="$t('dateTo')"
                      :hint="$t('leaveBlankIfYouStillWorkHere')"
                      mask="##/##/####"
                      return-masked-value
                      validate-on-blur
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="employmentItem.company"
                      :rules="[v => !!v || $t('companyIsRequired')]"
                      :label="$t('company')"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="employmentItem.title"
                      :rules="[v => !!v || $t('titleIsRequired')]"
                      :label="$t('title')"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="employmentItem.description"
                      :rules="[v => !!v || $t('descriptionIsRequired')]"
                      :label="$t('description')"
                      rows="2"
                      required
                    />
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
    <v-timeline v-if="employmentItemsOrdered.length" align-top dense>
      <v-timeline-item
        v-for="(item, index) in employmentItemsOrdered"
        :key="index"
        small
      >
        <v-container class="px-0 pb-0 pt-3" grid-list-xl>
          <v-layout wrap justify-center align-center>
            <v-flex xs12 sm8 lg10>
              <div class="grey--text font-weight-bold">
                {{ formatDates(item.dateFrom, item.dateTo) }}
              </div>
              <div class="font-weight-bold mt-2">{{ item.title }}</div>
              <div class="caption mb-2">{{ item.company }}</div>
              <p class="ma-0">{{ item.description }}</p>
            </v-flex>
            <v-flex class="text-xs-center text-sm-right" xs12 sm4 lg2>
              <v-btn block depressed @click="editEmploymentItem(item, index)">{{
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
                      $t('removeEmploymentItem')
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
                      @click="removeEmploymentItem"
                      >{{ $t('remove') }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
      </v-timeline-item>
    </v-timeline>
  </v-flex>
</template>

<script>
import { formatDates } from '~/assets/js/util';
function getDefaultEmploymentItem() {
  return {
    index: -1,
    employmentItem: null,
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
      return this.employmentItem.index < 0
        ? this.$t('addEmployment')
        : this.$t('editEmployment');
    },
    employmentItemsOrdered() {
      const employmentItems = [...this.employmentItems];
      return employmentItems.sort((a, b) => {
        return new Date(b.dateFrom) - new Date(a.dateFrom);
      });
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
    formatDates(dateFrom, dateTo) {
      return formatDates.call(this, dateFrom, dateTo);
    },
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
