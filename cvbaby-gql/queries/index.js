import PaymentQuery from './payment';
import UserQuery from './user';
import ResumeQuery from './resume';
import SlugQuery from './slug';
import AnalyticsQuery from './analytics';

export const queries = {
  getResume: UserQuery.getResume,
  getClientPaymentToken: PaymentQuery.getClientPaymentToken,
  getSubscription: PaymentQuery.getSubscription,
  getDefaultPaymentMethod: PaymentQuery.getDefaultPaymentMethod,
  getUser: UserQuery.getUser,
  getResume: ResumeQuery.getResume,
  getResumes: ResumeQuery.getResumes,
  getAnalytics: AnalyticsQuery.getAnalytics,
  checkSlugAvailable: SlugQuery.checkSlugAvailable
};

export const mutations = {
  startSubscription: PaymentQuery.startSubscription,
  cancelSubscription: PaymentQuery.cancelSubscription,
  renewSubscription: PaymentQuery.renewSubscription,
  updatePaymentMethod: PaymentQuery.updatePaymentMethod,
  saveResume: ResumeQuery.saveResume,
  removeResume: ResumeQuery.removeResume
};
