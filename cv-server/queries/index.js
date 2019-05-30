import PaymentQuery from './payment';
import UserQuery from './user';

export const queries = {
  getClientPaymentToken: PaymentQuery.getClientPaymentToken,
  startSubscription: PaymentQuery.startSubscription,
  getSubscription: PaymentQuery.getSubscription,
  getUser: UserQuery.getUser
};

export const mutations = {};
