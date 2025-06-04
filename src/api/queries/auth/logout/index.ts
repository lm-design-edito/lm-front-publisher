import { api } from "../../..";
import API_ROUTES from "../../../routes";

export const postLogout = async () =>  api.query(API_ROUTES.AUTH_POST_LOGOUT, {
    method: 'POST'
});

export const postLogoutEverywhere = async () =>  api.query(API_ROUTES.AUTH_POST_LOGOUT_EVERYWHERE, {
    method: 'POST'
});