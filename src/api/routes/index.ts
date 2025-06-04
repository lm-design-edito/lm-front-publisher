const API_ROUTES = {
    AUTH_GET_CSRF_TOKEN: 'csrf/get-token',
    AUTH_REFRESH_JWT_TOKEN: 'auth/refresh-token',
    AUTH_POST_WHOAMI: 'auth/whoami',
    AUTH_POST_LOGIN: 'auth/login',
    AUTH_POST_LOGOUT: 'auth/logout',
    AUTH_POST_LOGOUT_EVERYWHERE: 'auth/logout-everywhere',
    AUTH_POST_SIGNUP: 'auth/signup',
    AUTH_POST_REQUEST_EMAIL_VERIFICATION_TOKEN: 'auth/request-email-verification-token',

    ADMIN_USERS_UPDATE: 'admin/users/update',
    
}

export default API_ROUTES;