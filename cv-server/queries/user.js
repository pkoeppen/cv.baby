import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql';
import { authorize } from '../util';
import { UserType, ResumeType, ResumeInputType } from '../types';
import {
  getUser,
  getResume,
  getResumes,
  saveResume,
  removeResume,
  getUploadURL
} from '../resolvers';

export default {
  getUser: {
    type: new GraphQLNonNull(UserType),
    resolve: authorize((root, args, ctx) => {
      const { userID } = ctx;
      return getUser(userID);
    })
  },
  getResume: {
    type: new GraphQLNonNull(ResumeType),
    args: {
      slug: {
        name: 'slug',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      const { slug } = args;
      return getResume(slug);
    }
  },
  getResumes: {
    type: new GraphQLList(ResumeType),
    resolve: authorize((root, args, ctx) => {
      const { userID } = ctx;
      return getResumes(userID);
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
      const { userID } = ctx;
      return saveResume(userID, index, resume);
    })
  },
  removeResume: {
    type: new GraphQLNonNull(ResumeType),
    args: {
      index: {
        name: 'index',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { index } = args;
      const { userID } = ctx;
      return removeResume(userID, index);
    })
  },
  getUploadURL: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      index: {
        name: 'index',
        type: new GraphQLNonNull(GraphQLInt)
      },
      contentType: {
        name: 'contentType',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { index, contentType } = args;
      const { userID } = ctx;
      return getUploadURL(userID, index, contentType);
    })
  }
};
