export const HANDLED_AUTH_ERRORS = {
  CSRF_TOKEN: 'invalid-csrf-token',
  USER_NOT_AUTHENTICATED: 'user-not-authenticated',
  JWT_TOKEN: 'refresh-token',
};

export const HANDLED_AUTH_ERRORS_VALUES = Object.values(HANDLED_AUTH_ERRORS);
