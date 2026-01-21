import type { FileRouteTypes } from './routeTree.gen';

export type AppRoutePaths = FileRouteTypes['fullPaths'];
export type AppRouteIds = FileRouteTypes['id'];

export const appRoutes = {
  index: '/',
  login: '/auth/login',
  signup: '/auth/signup',
  verifyEmail: '/auth/verify-email',
  requestNewPassword: '/auth/request-new-password',
  submitNewPassword: '/auth/submit-new-password',

  account: '/account',

  admin: '/admin',
  adminUsers: '/admin/users',
  adminUserDetail: '/admin/users/$id',

  auth: '/auth',

  imageGenerator: '/image/generator',
  imageTinyLmg: '/image/tiny-lmg',
} as const satisfies Record<string, AppRoutePaths>;

export type AppRouteValues = (typeof appRoutes)[keyof typeof appRoutes];
