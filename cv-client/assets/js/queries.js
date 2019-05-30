export const UserQuery = `
  query {
    getUser {
      resumes {
        alias,
        createdAt,
        updatedAt,
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
          company,
          color
        },
        education {
          dateFrom,
          dateTo,
          university,
          degree,
          color
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
          siteId,
          title,
          link
        }
      }
    }
  }
`;

export const SubscriptionQuery = `
  query {
    getSubscription {
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
  }
`;

export const StartSubscriptionMutation = `
  query ($paymentMethodToken: String!, $planId: String!) {
    startSubscription (paymentMethodToken: $paymentMethodToken, planId: $planId)
  }
`;
