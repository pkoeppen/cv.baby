import { GraphQLString } from 'graphql';

export const TestQuery = {
  test: {
    type: GraphQLString,
    resolve: (root, args, ctx, ast) => {
      console.log('im in\n\n\n\n\n');
    }
  }
};
