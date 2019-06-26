import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';

export const AnalyticsEventType = new GraphQLObjectType({
  name: 'AnalyticsEventType',
  fields: () => ({
    latitude: {
      type: GraphQLString
    },
    longitude: {
      type: GraphQLString
    },
    timestamp: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

export const AnalyticsType = new GraphQLObjectType({
  name: 'AnalyticsType',
  fields: () => ({
    events: {
      type: new GraphQLList(AnalyticsEventType)
    }
  })
});
