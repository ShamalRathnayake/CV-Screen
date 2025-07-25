import { UserRole } from '../../shared/types/roles.enum';

export const permissions = {
  singlePrediction: {
    path: '/',
  },
  multiplePrediction: {
    path: '/multi',
    grantedUserRoles: [UserRole.USER],
  },
  getAnalytics: {
    path: '/analytics',
    grantedUserRoles: [UserRole.USER],
  },
  getPredictions: {
    path: '/',
    grantedUserRoles: [UserRole.USER],
  },
};
