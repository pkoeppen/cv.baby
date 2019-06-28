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
              >{{ $t('addReference')
              }}<v-icon class="ml-2" small>library_add</v-icon></v-btn
            >
          </v-toolbar>
        </template>
        <v-form ref="form" lazy-validation @submit="saveReferenceItem">
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
                      v-model="referenceItem.name"
                      :rules="[v => !!v || $t('nameIsRequired')]"
                      :label="$t('name')"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.title"
                      :rules="[v => !!v || $t('titleIsRequired')]"
                      :label="$t('title')"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.company"
                      :rules="[v => !!v || $t('companyIsRequired')]"
                      :label="$t('company')"
                      single-line
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.phone"
                      :label="$t('phone')"
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.email"
                      :label="$t('email')"
                      single-line
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="referenceItem.yearsKnown"
                      :rules="[
                        v => !!v || $t('yearsKnownIsRequired'),
                        v => !isNaN(v) || $t('mustBeANumber')
                      ]"
                      :label="$t('yearsKnown')"
                      single-line
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
    <v-container class="py-0" grid-list-xl>
      <template v-for="(item, index) in referenceItems">
        <v-layout
          :key="index"
          class="py-2 justify-space-between align-center"
          wrap
        >
          <v-flex xs12 sm8 lg10>
            <div>
              <span class="font-weight-bold">{{ $t('name') }}:</span>
              {{ item.name }}
            </div>
            <div>
              <span class="font-weight-bold">{{ $t('title') }}:</span>
              {{ item.title }}
            </div>
            <div>
              <span class="font-weight-bold">{{ $t('company') }}:</span>
              {{ item.company }}
            </div>
            <div v-if="item.phone">
              <span class="font-weight-bold">{{ $t('phone') }}:</span>
              {{ item.phone }}
            </div>
            <div v-if="item.email">
              <span class="font-weight-bold">{{ $t('email') }}:</span>
              {{ item.email }}
            </div>
          </v-flex>
          <v-flex class="text-xs-center text-sm-right" xs12 sm4 lg2>
            <v-btn block depressed @click="editReferenceItem(item, index)">{{
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
                    $t('removeReferenceItem')
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
                  <v-btn depressed color="error" @click="removeReferenceItem">{{
                    $t('remove')
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-divider v-if="index + 1 < referenceItems.length" :key="index" />
      </template>
    </v-container>
  </v-flex>
</template>

<script>
function getDefaultReferenceItem() {
  return {
    index: -1,
    referenceItem: null,
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
      return this.referenceItem.index < 0
        ? this.$t('addReference')
        : this.$t('editReference');
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
