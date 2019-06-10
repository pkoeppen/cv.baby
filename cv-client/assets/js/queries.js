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
    alias,
    slug,
    name,
    title,
    email,
    phone,
    website,
    profile,
    description,
    skills,
    employment {
      dateFrom,
      dateTo,
      title,
      company
    },
    education {
      dateFrom,
      dateTo,
      university,
      degree
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
      title
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
export const UploadURLQuery = `
  query ($index: Int!, $contentType: String!) {
    getUploadURL (index: $index, contentType: $contentType)
  }
`;

/*
 * Mutations
 */
export const StartSubscriptionMutation = `
  mutation ($paymentMethodToken: String!, $planId: String!) {
    startSubscription (paymentMethodToken: $paymentMethodToken, planId: $planId)
  }
`;
export const SaveResumeMutation = `
  mutation ($index: Int!, $resume: ResumeInputType!) {
    saveResume (index: $index, resume: $resume) {
      ...ResumeFields
    }
  }
  ${ResumeFragment}
`;
export const RemoveResumeMutation = `
  mutation ($index: Int!) {
    removeResume (index: $index) {
      ...ResumeFields
    }
  }
  ${ResumeFragment}
`;
