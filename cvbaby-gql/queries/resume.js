import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
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
      },
      submitAnalyticsEvent: {
        name: 'submitAnalyticsEvent',
        type: new GraphQLNonNull(GraphQLBoolean)
      }
    },
    resolve: (root, args, ctx) => {
      const { slug, submitAnalyticsEvent } = args;
      const { userID, ipAddress } = ctx;
      return getResume(slug, { submitAnalyticsEvent, ipAddress, userID });
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
      const { userID, username } = ctx;
      return saveResume(username, userID, resume, base64Image);
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
      const { userID, username } = ctx;
      return removeResume(username, userID, resumeID);
    })
  }
};
