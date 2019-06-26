import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';
import { AnalyticsType } from './analytics';

/*
 * Output
 */
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
    analytics: {
      type: new GraphQLList(AnalyticsType)
    },
    alias: {
      type: new GraphQLNonNull(GraphQLString),
      defaultValue: 'Untitled Resume'
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    color: {
      type: GraphQLString,
      defaultValue: '#2196F3'
    },
    live: {
      type: GraphQLBoolean,
      defaultValue: true
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

/*
 * Input
 */
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
    },
    description: {
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
    },
    description: {
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
    },
    description: {
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
      type: new GraphQLNonNull(GraphQLString),
      defaultValue: 'Untitled Resume'
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    color: {
      type: GraphQLString,
      defaultValue: '#2196F3'
    },
    live: {
      type: GraphQLBoolean,
      defaultValue: true
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
