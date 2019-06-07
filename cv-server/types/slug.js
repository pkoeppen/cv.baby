import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export const SlugType = new GraphQLObjectType({
  name: 'SlugType',
  fields: () => ({
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userID: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});
