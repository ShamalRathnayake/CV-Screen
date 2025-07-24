import { UserRole } from '../../shared/types/roles.enum';

export const permissions = {
  createUser: {
    path: '/create',
  },
  updateUser: {
    path: '/update',
    grantedUserRoles: [UserRole.USER],
  },
  getUserById: {
    path: '/:id',
    grantedUserRoles: [UserRole.USER],
  },
  createPayment: {
    path: '/payment',
  },
  login: {
    path: '/login',
    grantedUserRoles: [UserRole.USER],
  },
  checkEmail: {
    path: '/check-email',
  },
};
