import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';

export const AnalyticsEventType = new GraphQLObjectType({
  name: 'AnalyticsEventType',
  fields: () => ({
    resumeID: {
      type: new GraphQLNonNull(GraphQLID)
    },
    stamp: {
      type: new GraphQLNonNull(GraphQLString)
    },
    latitude: {
      type: GraphQLString
    },
    longitude: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    }
  })
});

export const AnalyticsType = new GraphQLObjectType({
  name: 'AnalyticsType',
  fields: () => ({
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    events: {
      type: new GraphQLList(AnalyticsEventType)
    }
  })
});
