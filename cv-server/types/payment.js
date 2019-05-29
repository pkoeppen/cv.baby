import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import { authorize } from '../util';
import { getClientPaymentToken, startSubscription, getSubscription } from '../resolvers';

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
    creditCard: {
      type: CreditCardType
    },
    currencyIsoCode: {
      type: GraphQLNonNull(GraphQLString)
    },
    paymentInstrumentType: {
      type: GraphQLNonNull(GraphQLString)
    },
    paypalAccount: {
      type: PaypalAccountType
    },
    planId: {
      type: GraphQLNonNull(GraphQLString)
    },
    processorResponseType: {
      type: GraphQLString
    },
    status: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});

export const SubscriptionType = new GraphQLObjectType({
  name: 'SubscriptionType',
  fields: () => ({
    billingDayOfMonth: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString)
    },
    firstBillingDate: {
      type: GraphQLNonNull(GraphQLString)
    },
    nextBillAmount: {
      type: GraphQLNonNull(GraphQLString)
    },
    nextBillingDate: {
      type: GraphQLNonNull(GraphQLString)
    },
    paidThroughDate: {
      type: GraphQLString
    },
    planId: {
      type: GraphQLNonNull(GraphQLString)
    },
    status: {
      type: GraphQLNonNull(GraphQLString)
    },
    trialPeriod: {
      type: GraphQLNonNull(GraphQLBoolean)
    },
    transactions: {
      type: GraphQLList(TransactionType)
    },
  })
})