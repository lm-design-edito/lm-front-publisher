import { api } from '../../..';
import API_ROUTES from '../../../routes';

export const logout = async () =>
  api.query(API_ROUTES.AUTH_POST_LOGOUT, {
    method: 'POST',
  });

export const logoutEverywhere = async () =>
  api.query(API_ROUTES.AUTH_POST_LOGOUT_EVERYWHERE, {
    method: 'POST',
  });
