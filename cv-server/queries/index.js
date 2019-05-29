import PaymentQuery from './payment';

export const queries = {
  getClientPaymentToken: PaymentQuery.getClientPaymentToken,
  startSubscription: PaymentQuery.startSubscription,
  getSubscription: PaymentQuery.getSubscription
};

export const mutations = {};
