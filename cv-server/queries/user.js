import { GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import { authorize } from '../util';
import { UserType, ResumeType, ResumeInputType } from '../types';
import { getUser, getResumes, saveResume } from '../resolvers';

export default {
  getUser: {
    type: new GraphQLNonNull(UserType),
    resolve: authorize((root, args, ctx) => {
      const { principalId } = ctx;
      return getUser(principalId);
    })
  },
  getResumes: {
    type: new GraphQLList(ResumeType),
    resolve: authorize((root, args, ctx) => {
      const { principalId } = ctx;
      return getResumes(principalId);
    })
  },
  saveResume: {
    type: new GraphQLNonNull(ResumeType),
    args: {
      index: {
        name: 'index',
        type: new GraphQLNonNull(GraphQLInt)
      },
      resume: {
        name: 'resume',
        type: new GraphQLNonNull(ResumeInputType)
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { index, resume } = args;
      const { principalId } = ctx;
      return saveResume(principalId, index, resume);
    })
  }
};
