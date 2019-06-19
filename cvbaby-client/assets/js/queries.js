/*
 * Fragments
 */
export const SubscriptionFragment = `
  fragment SubscriptionFields on SubscriptionType {
    billingDayOfMonth,
    createdAt,
    firstBillingDate,
    nextBillAmount,
    nextBillingDate,
    paidThroughDate,
    planId,
    status,
    trialPeriod,
    transactions {
      amount,
      createdAt,
      creditCard {
        cardType,
        last4
      },
      currencyIsoCode,
      paymentInstrumentType,
      paypalAccount {
        payerEmail,
        paymentID
      },
      planId,
      processorResponseType,
      status
    }
  }
`;
export const ResumeFragment = `
  fragment ResumeFields on ResumeType {
    resumeID,
    userID,
    alias,
    slug,
    color,
    live,
    name,
    title,
    email,
    phone,
    website,
    profile,
    skills,
    employment {
      dateFrom,
      dateTo,
      title,
      company,
      description
    },
    education {
      dateFrom,
      dateTo,
      university,
      degree,
      description
    },
    references {
      name,
      title,
      company,
      yearsKnown,
      phone,
      email
    },
    hobbies {
      icon,
      title,
      description
    },
    social {
      title,
      link
    }
  }
`;

/*
 * Queries
 */
export const ResumeQuery = `
  query ($slug: String!) {
    getResume (slug: $slug) {
      ...ResumeFields
    }
  }
  ${ResumeFragment}
`;
export const UserQuery = `
  query {
    getUser {
      resumes {
        ...ResumeFields
      }
    }
  }
  ${ResumeFragment}
`;
export const SubscriptionQuery = `
  query {
    getSubscription {
      ...SubscriptionFields
    }
  }
  ${SubscriptionFragment}
`;
export const ResumesQuery = `
  query {
    getResumes {
      ...ResumeFields
    }
  }
  ${ResumeFragment}
`;
export const CheckSlugAvailableQuery = `
  query ($slug: String!) {
    checkSlugAvailable (slug: $slug)
  }
`;

/*
 * Mutations
 */
export const StartSubscriptionMutation = `
  mutation ($paymentMethodToken: String!, $planID: String!) {
    startSubscription (paymentMethodToken: $paymentMethodToken, planID: $planID)
  }
`;
export const SaveResumeMutation = `
  mutation ($resume: ResumeInputType!, $base64Image: String) {
    saveResume (resume: $resume, base64Image: $base64Image) {
      ...ResumeFields
    }
  }
  ${ResumeFragment}
`;
export const RemoveResumeMutation = `
  mutation ($resumeID: ID!) {
    removeResume (resumeID: $resumeID) {
      ...ResumeFields
    }
  }
  ${ResumeFragment}
`;
