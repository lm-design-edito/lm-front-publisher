import type { FileRouteTypes } from './routeTree.gen';

export type AppRoutePaths = FileRouteTypes['fullPaths'];

export type AppRouteIds = FileRouteTypes['id'];

export const appRoutes: Record<string, AppRoutePaths> = {
  index: '/',
  login: '/auth/login',
  signup: '/auth/signup',
  // account: '/auth/account',
  verifyEmail: '/auth/verify-email',
  adminUsers: '/admin/users',
  imageFormatter: '/image/formatter',
  // imageResize: '/image/resize',
  // imageConvert: '/image/convert',
  // imageOptimize: '/image/optimize',
  imageGenerator: '/image/generator',
  imageTinyLmg: '/image/tiny-lmg',
  imageTransformer: '/image/transformer',
} as const;
