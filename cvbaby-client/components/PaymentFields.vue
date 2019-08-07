<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="pa-2" xs12>
        <div
          :class="{
            'v-input--is-focused': fields.number.focused,
            'primary--text': fields.number.focused,
            'v-input--is-dirty': fields.number.dirty
          }"
          class="v-input v-text-field v-text-field--enclosed v-text-field--outline theme--light"
        >
          <div class="v-input__control">
            <div class="v-input__slot">
              <div class="v-text-field__slot">
                <label
                  :class="{
                    'v-label--active':
                      fields.number.focused || fields.number.dirty,
                    'primary--text': fields.number.focused
                  }"
                  class="v-label theme--light"
                  style="left:0px;right:auto;position:absolute;"
                >
                  {{ $t('cardNumber') }}
                </label>
                <div style="position: relative; top: 10px">
                  <div id="card-number" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
      <v-flex class="pa-2" xs12 md6>
        <div
          :class="{
            'v-input--is-focused': fields.cvv.focused,
            'primary--text': fields.cvv.focused,
            'v-input--is-dirty': fields.cvv.dirty
          }"
          class="v-input v-text-field v-text-field--enclosed v-text-field--outline theme--light"
        >
          <div class="v-input__control">
            <div class="v-input__slot">
              <div class="v-text-field__slot">
                <label
                  :class="{
                    'v-label--active': fields.cvv.focused || fields.cvv.dirty,
                    'primary--text': fields.cvv.focused
                  }"
                  class="v-label theme--light"
                  style="left:0px;right:auto;position:absolute;"
                >
                  {{ $t('cvv') }}
                </label>
                <div style="position: relative; top: 10px">
                  <div id="cvv" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
      <v-flex class="pa-2" xs12 md6>
        <div
          :class="{
            'v-input--is-focused': fields.expirationDate.focused,
            'primary--text': fields.expirationDate.focused,
            'v-input--is-dirty': fields.expirationDate.dirty
          }"
          class="v-input v-text-field v-text-field--enclosed v-text-field--outline theme--light"
        >
          <div class="v-input__control">
            <div class="v-input__slot">
              <div class="v-text-field__slot">
                <label
                  :class="{
                    'v-label--active':
                      fields.expirationDate.focused ||
                      fields.expirationDate.dirty,
                    'primary--text': fields.expirationDate.focused
                  }"
                  class="v-label theme--light"
                  style="left:0px;right:auto;position:absolute;"
                >
                  {{ $t('expirationDate') }}
                </label>
                <div style="position: relative; top: 10px">
                  <div id="expiration-date" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import braintree from 'braintree-web';

export default {
  name: 'PaymentFields',
  data() {
    return {
      hostedFields: null,
      fields: {
        number: {
          focused: false,
          dirty: false
        },
        cvv: {
          focused: false,
          dirty: false
        },
        expirationDate: {
          focused: false,
          dirty: false
        }
      }
    };
  },
  mounted() {
    this.getClientPaymentToken().then(token => {
      braintree.client.create(
        {
          authorization: token
        },
        this.clientCreatedCallback
      );
    });
  },
  methods: {
    getClientPaymentToken() {
      return this.$axios
        .post('/public', {
          query: `
            query { getClientPaymentToken }
          `
        })
        .then(({ data: { getClientPaymentToken: token } }) => token);
    },
    generateNonce() {
      const hostedFields = this.hostedFields;
      return new Promise((resolve, reject) => {
        hostedFields.tokenize((error, payload) => {
          if (error) {
            return reject(error);
          }
          resolve(payload.nonce);
        });
      });
    },
    clientCreatedCallback(error, client) {
      if (error) {
        // TODO
        console.error(error);
      }
      braintree.hostedFields.create(
        {
          client: client,
          styles: {
            input: {
              'font-size': '16px',
              'font-weight': 'bold',
              color: 'rgba(0,0,0,0.87)'
            },

            '.number': {
              'font-family': 'monospace'
            },

            '.cvv': {
              'font-family': 'monospace'
            },

            '.expirationDate': {
              'font-family': 'monospace'
            }
          },
          fields: {
            number: {
              selector: '#card-number'
            },
            cvv: {
              selector: '#cvv'
            },
            expirationDate: {
              selector: '#expiration-date'
            }
          }
        },
        this.hostedFieldsCallback
      );
    },
    hostedFieldsCallback(error, hostedFields) {
      if (error) {
        console.error(error);
      }
      hostedFields.on('focus', event => {
        this.fields[event.emittedBy].focused = true;
      });
      hostedFields.on('blur', event => {
        this.fields[event.emittedBy].focused = false;
      });
      hostedFields.on('notEmpty', event => {
        this.fields[event.emittedBy].dirty = true;
      });
      hostedFields.on('empty', event => {
        this.fields[event.emittedBy].dirty = false;
      });
      this.hostedFields = hostedFields;
    }
  }
};
</script>
<style lang="stylus" scoped>
#card-number, #cvv, #expiration-date
  height: 56px
  font-family: monospace
</style>
