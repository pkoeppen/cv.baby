export const ResumeFragment = `
  fragment ResumeFields on ResumeType {
    alias,
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
        paymentId
      },
      planId,
      processorResponseType,
      status
    }
  }
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
