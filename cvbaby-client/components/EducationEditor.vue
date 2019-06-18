<template>
  <v-flex xs12>
    <v-flex class="text-xs-center" xs12>
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="text-none" color="primary" flat depressed v-on="on">{{
            $t('addEducation')
          }}</v-btn>
        </template>
        <v-form ref="form" lazy-validation @submit="saveEducationItem">
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
                      v-model="educationItem.dateFrom"
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
                      v-model="educationItem.dateTo"
                      :rules="[v => !!v || $t('dateIsRequired')]"
                      :label="$t('dateTo')"
                      mask="##/##/####"
                      return-masked-value
                      validate-on-blur
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="educationItem.university"
                      :rules="[v => !!v || $t('universityIsRequired')]"
                      :label="$t('university')"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="educationItem.degree"
                      :rules="[v => !!v || $t('degreeIsRequired')]"
                      :label="$t('degree')"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="educationItem.description"
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
              <v-btn @click="dialog = false">{{ $t('cancel') }}</v-btn>
              <v-btn color="primary" type="submit">{{ $t('save') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-flex>
    <v-layout justify-center align-center wrap>
      <v-flex
        v-for="(item, index) in educationItems"
        :key="index"
        class="pa-2"
        xs12
        md6
      >
        <v-card>
          <v-card-title class="justify-center">
            <h3 class="headline">{{ index }} - {{ item.university }}</h3>
          </v-card-title>
          <v-divider />
          <v-card-text class="text-xs-center">
            {{ item.dateFrom }} - {{ item.dateTo || 'present' }}
            {{ item.degree }}
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-center">
            <v-btn flat @click="editEducationItem(item, index)">{{
              $t('edit')
            }}</v-btn>
            <v-btn color="error" flat @click="showConfirmRemoveDialog(index)">{{
              $t('remove')
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog v-model="confirmRemoveDialog" max-width="400">
        <v-card>
          <v-card-title
            class="cv-dialog-header text-xs-center justify-center pb-0 pt-4"
          >
            <span class="cv-dialog-header headline">{{
              $t('removeEducationItem')
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
            <v-btn @click="confirmRemoveDialog = false">{{
              $t('cancel')
            }}</v-btn>
            <v-btn color="error" @click="removeEducationItem">{{
              $t('remove')
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-flex>
</template>

<script>
function getDefaultEducationItem() {
  return {
    index: -1,
    dateFrom: null,
    dateTo: null,
    degree: null,
    university: null,
    description: null
  };
}
export default {
  name: 'EducationEditor',
  props: {
    educationItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      confirmRemoveDialog: false,
      removeIndex: -1,
      educationItem: getDefaultEducationItem()
    };
  },
  computed: {
    dialogTitlePrefix() {
      return this.educationItem.index < 0
        ? this.$t('addEducation')
        : this.$t('editEducation');
    }
  },
  watch: {
    dialog(value) {
      if (value === false) {
        // Reset education item on dialog close.
        this.educationItem = getDefaultEducationItem();
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  },
  methods: {
    editEducationItem(item, index) {
      // Load item into the educationItem slot and show the dialog.
      this.educationItem = { ...item, index };
      this.dialog = true;
    },
    saveEducationItem(event) {
      event.preventDefault();
      if (!this.$refs.form.validate()) {
        // Validation failed.
        return;
      }
      const { index, ...item } = this.educationItem;
      if (index === -1) {
        // Add a new education item.
        this.educationItems.push(item);
      } else {
        // Update an existing education item.
        this.educationItems[index] = item;
      }
      this.dialog = false;
      this.educationItem = getDefaultEducationItem();
      this.$emit('draft');
    },
    showConfirmRemoveDialog(index) {
      this.removeIndex = index;
      this.confirmRemoveDialog = true;
    },
    removeEducationItem() {
      this.educationItems.splice(this.removeIndex, 1);
      this.confirmRemoveDialog = false;
      this.removeIndex = -1;
    }
  }
};
</script>
