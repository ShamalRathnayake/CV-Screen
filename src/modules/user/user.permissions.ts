import { UserRole } from '../../shared/types/roles.enum';

export const permissions = {
  createUser: {
    path: '/create',
  },
  updateUser: {
    path: '/update',
    grantedUserRoles: [UserRole.USER],
  },
};
