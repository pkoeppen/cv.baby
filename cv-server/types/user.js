import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

export const EmploymentType = new GraphQLObjectType({
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
    description: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const EducationType = new GraphQLObjectType({
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
    description: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const ReferenceType = new GraphQLObjectType({
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

export const HobbyType = new GraphQLObjectType({
  name: 'HobbyType',
  fields: () => ({
    icon: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const SocialLinkType = new GraphQLObjectType({
  name: 'SocialLinkType',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    link: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const ResumeType = new GraphQLObjectType({
  name: 'ResumeType',
  fields: () => ({
    resumeID: {
      type: new GraphQLNonNull(GraphQLID)
    },
    userID: {
      type: GraphQLID
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
    userID: {
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
