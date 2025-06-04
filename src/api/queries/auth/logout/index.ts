import { api } from "../../..";
import API_ROUTES from "../../../routes";

export const postLogout = async () =>  api.query(API_ROUTES.AUTH_POST_LOGOUT, {
    method: 'POST'
});