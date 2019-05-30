import PaymentQuery from './payment';
import UserQuery from './user';

export const queries = {
  getClientPaymentToken: PaymentQuery.getClientPaymentToken,
  getSubscription: PaymentQuery.getSubscription,
  getUser: UserQuery.getUser
};

export const mutations = {
  startSubscription: PaymentQuery.startSubscription
};
