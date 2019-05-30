import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

const CreditCardType = new GraphQLObjectType({
  name: 'CreditCardType',
  fields: () => ({
    cardType: {
      type: GraphQLString
    },
    last4: {
      type: GraphQLString
    }
  })
});

const PaypalAccountType = new GraphQLObjectType({
  name: 'PaypalAccountType',
  fields: () => ({
    payerEmail: {
      type: GraphQLString
    },
    paymentId: {
      type: GraphQLString
    }
  })
});

const TransactionType = new GraphQLObjectType({
  name: 'TransactionType',
  fields: () => ({
    amount: {
      type: new GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },
    creditCard: {
      type: CreditCardType
    },
    currencyIsoCode: {
      type: new GraphQLNonNull(GraphQLString)
    },
    paymentInstrumentType: {
      type: new GraphQLNonNull(GraphQLString)
    },
    paypalAccount: {
      type: PaypalAccountType
    },
    planId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    processorResponseType: {
      type: GraphQLString
    },
    status: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

export const SubscriptionType = new GraphQLObjectType({
  name: 'SubscriptionType',
  fields: () => ({
    billingDayOfMonth: {
      type: new GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },
    firstBillingDate: {
      type: new GraphQLNonNull(GraphQLString)
    },
    nextBillAmount: {
      type: new GraphQLNonNull(GraphQLString)
    },
    nextBillingDate: {
      type: new GraphQLNonNull(GraphQLString)
    },
    paidThroughDate: {
      type: GraphQLString
    },
    planId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: new GraphQLNonNull(GraphQLString)
    },
    trialPeriod: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    transactions: {
      type: new GraphQLList(TransactionType)
    }
  })
});
