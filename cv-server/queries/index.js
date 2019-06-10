import PaymentQuery from './payment';
import UserQuery from './user';
import SlugQuery from './slug';

export const queries = {
  getResume: UserQuery.getResume,
  getClientPaymentToken: PaymentQuery.getClientPaymentToken,
  getSubscription: PaymentQuery.getSubscription,
  getUser: UserQuery.getUser,
  getResumes: UserQuery.getResumes,
  checkSlugAvailable: SlugQuery.checkSlugAvailable,
  getUploadURL: UserQuery.getUploadURL
};

export const mutations = {
  startSubscription: PaymentQuery.startSubscription,
  saveResume: UserQuery.saveResume,
  removeResume: UserQuery.removeResume
};
