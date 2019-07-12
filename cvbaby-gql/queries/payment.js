import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { authorize } from '../util';
import { SubscriptionType, PaymentMethodType } from '../types';
import {
  getClientPaymentToken,
  startSubscription,
  cancelSubscription,
  renewSubscription,
  getSubscription,
  getDefaultPaymentMethod,
  updatePaymentMethod
} from '../resolvers';

export default {
  getClientPaymentToken: {
    type: new GraphQLNonNull(GraphQLString),
    resolve: () => {
      return getClientPaymentToken();
    }
  },
  getSubscription: {
    type: SubscriptionType,
    resolve: authorize((root, args, ctx) => {
      const { username } = ctx;
      return getSubscription(username);
    })
  },
  getDefaultPaymentMethod: {
    type: PaymentMethodType,
    resolve: authorize((root, args, ctx) => {
      const { userID } = ctx;
      return getDefaultPaymentMethod(userID);
    })
  },
  startSubscription: {
    type: GraphQLBoolean,
    args: {
      paymentMethodNonce: {
        name: 'paymentMethodNonce',
        type: new GraphQLNonNull(GraphQLString)
      },
      planID: {
        name: 'planID',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { paymentMethodNonce, planID } = args;
      const { userID, username } = ctx;
      return startSubscription(userID, username, paymentMethodNonce, planID);
    })
  },
  cancelSubscription: {
    type: SubscriptionType,
    resolve: authorize((root, args, ctx) => {
      const { username } = ctx;
      return cancelSubscription(username);
    })
  },
  renewSubscription: {
    type: SubscriptionType,
    resolve: authorize((root, args, ctx) => {
      const { userID, username } = ctx;
      return renewSubscription(userID, username);
    })
  },
  updatePaymentMethod: {
    type: PaymentMethodType,
    args: {
      paymentMethodNonce: {
        name: 'paymentMethodNonce',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { paymentMethodNonce } = args;
      const { userID, username } = ctx;
      return updatePaymentMethod(userID, username, paymentMethodNonce);
    })
  }
};
