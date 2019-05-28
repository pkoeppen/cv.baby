import { GraphQLString } from 'graphql';
import { getClientPaymentToken } from '../resolvers';

export default {
  getClientPaymentToken: {
    type: GraphQLString,
    resolve: (root, args, ctx, ast) => {
      return getClientPaymentToken();
    }
  }
};
