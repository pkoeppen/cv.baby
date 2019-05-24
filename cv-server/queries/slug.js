import { GraphQLNonNull, GraphQLString } from 'graphql';
import { SlugType } from '../types';
import { getSlug } from '../resolvers';

export const SharedQuery = {
  resolveSlug: {
    type: SlugType,
    args: {
      slug: {
        name: 'slug',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args, ctx, ast) => {
      const { slug } = args;
      return getSlug(slug);
    }
  },
};
