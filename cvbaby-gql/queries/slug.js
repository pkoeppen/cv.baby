import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
import { checkSlugAvailable } from '../resolvers';

export default {
  checkSlugAvailable: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      slug: {
        name: 'slug',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      const { slug } = args;
      return checkSlugAvailable(slug);
    }
  }
};
