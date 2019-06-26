import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { authorize } from '../util';
import { AnalyticsType, ResumeType } from '../types';
import { getResumes, submitAnalyticsEvent } from '../resolvers';

export default {
  getAnalytics: {
    type: new GraphQLList(ResumeType),
    resolve: authorize((root, args, ctx) => {
      const { userID } = ctx;
      return getResumes(userID, true);
    })
  },
  submitAnalyticsEvent: {
    type: new GraphQLNonNull(AnalyticsType),
    args: {
      ipAddress: {
        name: 'ipAddress',
        type: new GraphQLNonNull(GraphQLString)
      },
      timestamp: {
        name: 'timestamp',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      const { ipAddress, timestamp } = args;
      return submitAnalyticsEvent(ipAddress, timestamp);
    }
  }
};
