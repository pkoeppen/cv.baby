import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';

export const EmploymentInputType = new GraphQLInputObjectType({
  name: 'EmploymentInputType',
  fields: () => ({
    dateFrom: {
      type: new GraphQLNonNull(GraphQLString)
    },
    dateTo: {
      type: GraphQLString
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    company: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const EducationInputType = new GraphQLInputObjectType({
  name: 'EducationInputType',
  fields: () => ({
    dateFrom: {
      type: new GraphQLNonNull(GraphQLString)
    },
    dateTo: {
      type: GraphQLString
    },
    university: {
      type: new GraphQLNonNull(GraphQLString)
    },
    degree: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const ReferenceInputType = new GraphQLInputObjectType({
  name: 'ReferenceInputType',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    yearsKnown: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    website: {
      type: GraphQLString
    }
  })
});

export const HobbyInputType = new GraphQLInputObjectType({
  name: 'HobbyInputType',
  fields: () => ({
    icon: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const SocialLinkInputType = new GraphQLInputObjectType({
  name: 'SocialLinkInputType',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    link: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const ResumeInputType = new GraphQLInputObjectType({
  name: 'ResumeInputType',
  fields: () => ({
    resumeID: {
      type: GraphQLString
    },
    alias: {
      type: new GraphQLNonNull(GraphQLString)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    website: {
      type: GraphQLString
    },
    profile: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    skills: {
      type: new GraphQLList(GraphQLString)
    },
    employment: {
      type: new GraphQLList(EmploymentInputType)
    },
    education: {
      type: new GraphQLList(EducationInputType)
    },
    references: {
      type: new GraphQLList(ReferenceInputType)
    },
    hobbies: {
      type: new GraphQLList(HobbyInputType)
    },
    social: {
      type: new GraphQLList(SocialLinkInputType)
    }
  })
});
