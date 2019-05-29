import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { authorize } from '../util';
import { SubscriptionType } from '../types';
import { getClientPaymentToken, startSubscription, getSubscription } from '../resolvers';

export default {
  getClientPaymentToken: {
    type: GraphQLNonNull(GraphQLString),
    resolve: (root, args, ctx) => {
      return getClientPaymentToken();
    }
  },
  startSubscription: {
    type: GraphQLBoolean,
    args: {
      paymentMethodToken: {
        name: 'paymentMethodToken',
        type: new GraphQLNonNull(GraphQLString)
      },
      planId: {
        name: 'planId',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: authorize(
      (root, args, ctx) => {
        const { paymentMethodToken, planId } = args;
        const { principalId } = ctx;
        return startSubscription(principalId, paymentMethodToken, planId);
      }
    )
  },
  getSubscription: {
    type: SubscriptionType,
    resolve: authorize(
      (root, args, ctx) => {
        const { principalId } = ctx;
        return getSubscription(principalId);
      }
    )
  }
}
