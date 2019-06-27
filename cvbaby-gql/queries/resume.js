import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { authorize } from '../util';
import { ResumeType, ResumeInputType } from '../types';
import { getResume, getResumes, saveResume, removeResume } from '../resolvers';

export default {
  getResume: {
    type: new GraphQLNonNull(ResumeType),
    args: {
      slug: {
        name: 'slug',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args, ctx) => {
      const { slug } = args;
      const { userID, ipAddress } = ctx;
      return getResume(slug, ipAddress, userID);
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
      resume: {
        name: 'resume',
        type: new GraphQLNonNull(ResumeInputType)
      },
      base64Image: {
        name: 'base64Image',
        type: GraphQLString
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { resume, base64Image } = args;
      const { userID } = ctx;
      return saveResume(userID, resume, base64Image);
    })
  },
  removeResume: {
    type: new GraphQLNonNull(ResumeType),
    args: {
      resumeID: {
        name: 'resumeID',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: authorize((root, args, ctx) => {
      const { resumeID } = args;
      const { userID } = ctx;
      return removeResume(userID, resumeID);
    })
  }
};
