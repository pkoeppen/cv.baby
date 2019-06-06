import PaymentQuery from './payment';
import UserQuery from './user';

export const queries = {
  getClientPaymentToken: PaymentQuery.getClientPaymentToken,
  getSubscription: PaymentQuery.getSubscription,
  getUser: UserQuery.getUser,
  getResumes: UserQuery.getResumes
};

export const mutations = {
  startSubscription: PaymentQuery.startSubscription,
  saveResume: UserQuery.saveResume,
  removeResume: UserQuery.removeResume
};
