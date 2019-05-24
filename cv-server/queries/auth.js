import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';


const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    access_token: { type: new GraphQLNonNull(GraphQLString) },
    id_token: { type: new GraphQLNonNull(GraphQLString) },
    token_type: { type: new GraphQLNonNull(GraphQLString) },
    expires_in: { type: new GraphQLNonNull(GraphQLInt) },
  })
});

export const AuthQuery = {
  getToken: {
    type: new GraphQLNonNull(TokenType),
    args: {
      email: {
        name: 'email',
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        name: 'password',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args, ctx, ast) => {
      const { email, password } = args;
      return;
    }
  }
};
