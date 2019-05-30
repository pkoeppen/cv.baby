import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

const EmploymentType = new GraphQLObjectType({
  name: 'EmploymentType',
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
    },
    color: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const EducationType = new GraphQLObjectType({
  name: 'EducationType',
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
    },
    color: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const ReferenceType = new GraphQLObjectType({
  name: 'ReferenceType',
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
      type: GraphQLInt
    },
    phone: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  })
});

const HobbyType = new GraphQLObjectType({
  name: 'HobbyType',
  fields: () => ({
    icon: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    }
  })
});

const SocialLinkType = new GraphQLObjectType({
  name: 'SocialLinkType',
  fields: () => ({
    siteId: {
      type: GraphQLString
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    link: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

const ResumeType = new GraphQLObjectType({
  name: 'ResumeType',
  fields: () => ({
    alias: {
      type: new GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },
    updatedAt: {
      type: GraphQLString
    },

    // Personal fields.
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
      type: new GraphQLList(EmploymentType)
    },
    education: {
      type: new GraphQLList(EducationType)
    },
    references: {
      type: new GraphQLList(ReferenceType)
    },
    hobbies: {
      type: new GraphQLList(HobbyType)
    },
    social: {
      type: new GraphQLList(SocialLinkType)
    }
  })
});

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    userId: {
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
