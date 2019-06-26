import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import { ResumeType } from './resume';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    userID: {
      type: new GraphQLNonNull(GraphQLID)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },
    updatedAt: {
      type: GraphQLString
    },
    resumes: {
      type: new GraphQLList(ResumeType)
    }
  })
});
