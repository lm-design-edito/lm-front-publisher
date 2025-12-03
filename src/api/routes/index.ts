const API_ROUTES = {
  SYSTEM_STATUS_CHECK: 'system/status-check',

  AUTH_GET_CSRF_TOKEN: 'csrf/get-token',
  AUTH_REFRESH_JWT_TOKEN: 'auth/refresh-token',
  AUTH_POST_WHOAMI: 'auth/whoami',
  AUTH_POST_LOGIN: 'auth/login',
  AUTH_POST_LOGOUT: 'auth/logout',
  AUTH_POST_LOGOUT_EVERYWHERE: 'auth/logout-everywhere',
  AUTH_POST_SIGNUP: 'auth/signup',
  AUTH_POST_REQUEST_EMAIL_VERIFICATION_TOKEN:
    'auth/request-email-verification-token',
  AUTH_POST_VERIFY_EMAIL: 'POST:/auth/verify-email',

  ADMIN_USERS_UPDATE: 'admin/users/update',
  ADMIN_USERS_LIST: 'admin/users/list',
  ADMIN_USERS_GET: 'POST:/admin/users/get',
  ADMIN_USERS_GET_UPLOAD_QUOTA: 'POST:/admin/users/get-upload-quota',
  ADMIN_USERS_RESET_UPLOAD_QUOTA: 'POST:/admin/users/reset-upload-quota',

  IMAGE_FORMAT: 'image/format',
  IMAGE_FORMAT_TO_WIDTH: 'image/format/to-width',
  IMAGE_TRANSFORM: 'image/transform',

  DESIGN_EDITO_THUMB_UPLOAD_TEMP: 'POST:/design-edito/thumbs/upload',
  DESIGN_EDITO_THUMB_DOWNLOAD_TEMP: 'GET:/design-edito/thumbs/get/:id',
  DESIGN_EDITO_THUMB_TEMPLATE_GENERATE_BOOK:
    'POST:/design-edito/thumbs/template/book/generate',
};

export default API_ROUTES;
