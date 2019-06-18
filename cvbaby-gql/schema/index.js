import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { queries, mutations } from '../queries';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
});
