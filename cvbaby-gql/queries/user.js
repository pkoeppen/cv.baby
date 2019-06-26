import { GraphQLNonNull } from 'graphql';
import { authorize } from '../util';
import { UserType } from '../types';
import { getUser } from '../resolvers';

export default {
  getUser: {
    type: new GraphQLNonNull(UserType),
    resolve: authorize((root, args, ctx) => {
      const { userID } = ctx;
      return getUser(userID);
    })
  }
};
