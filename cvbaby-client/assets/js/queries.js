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
export const PaymentMethodFragment = `
  fragment PaymentMethodFields on PaymentMethodType {
    cardType,
    last4
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
export const AnalyticsFragment = `
  fragment AnalyticsFields on ResumeType {
    resumeID,
    userID,
    alias,
    slug,
    analytics {
      date,
      events {
        stamp,
        latitude,
        longitude,
        city,
        country
      }
    }
  }
`;

/*
 * Queries
 */
export const ResumeQuery = `
  query ($slug: String!, $submitAnalyticsEvent: Boolean!) {
    getResume (slug: $slug, submitAnalyticsEvent: $submitAnalyticsEvent) {
      ...ResumeFields
    }
  }
  ${ResumeFragment}
`;
export const AnalyticsQuery = `
  query {
    getAnalytics {
      ...AnalyticsFields
    }
  }
  ${AnalyticsFragment}
`;
export const SubscriptionQuery = `
  query {
    getSubscription {
      ...SubscriptionFields
    }
  }
  ${SubscriptionFragment}
`;
export const DefaultPaymentMethodQuery = `
  query {
    getDefaultPaymentMethod {
      ...PaymentMethodFields
    }
  }
  ${PaymentMethodFragment}
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
  mutation ($paymentMethodNonce: String!, $planID: String!) {
    startSubscription (paymentMethodNonce: $paymentMethodNonce, planID: $planID)
  }
`;
export const CancelSubscriptionMutation = `
  mutation {
    cancelSubscription
  }
`;
export const UpdatePaymentMethodMutation = `
  mutation ($paymentMethodNonce: String!) {
    updatePaymentMethod (paymentMethodNonce: $paymentMethodNonce) {
      ...PaymentMethodFields
    }
  }
  ${PaymentMethodFragment}
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
