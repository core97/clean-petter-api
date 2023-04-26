const userRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export type UserRole = keyof typeof userRole;

export const isValidUserRole = (option: unknown): option is UserRole =>
  typeof option === 'string' && Object.keys(userRole).includes(option);
