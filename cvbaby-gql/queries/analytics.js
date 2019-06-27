import { GraphQLList } from 'graphql';
import { authorize } from '../util';
import { ResumeType } from '../types';
import { getResumes } from '../resolvers';

export default {
  getAnalytics: {
    type: new GraphQLList(ResumeType),
    resolve: authorize((root, args, ctx) => {
      const { userID } = ctx;
      return getResumes(userID, true);
    })
  }
};
