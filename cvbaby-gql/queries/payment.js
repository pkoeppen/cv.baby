import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { authorize } from '../util';
import { SubscriptionType } from '../types';
import {
  getClientPaymentToken,
  startSubscription,
  getSubscription
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
  startSubscription: {
    type: GraphQLBoolean,
    args: {
      paymentMethodToken: {
        name: 'paymentMethodToken',
        type: new GraphQLNonNull(GraphQLString)
      },
      planID: {
        name: 'planID',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { paymentMethodToken, planID } = args;
      const { userID, username } = ctx;
      return startSubscription(userID, username, paymentMethodToken, planID);
    })
  }
};
