import { api } from "../../..";
import API_ROUTES from "../../../routes";

type AuthLoginParams = {
    username: string,
    password: string,
} | {
    email: string,
    password: string,
};

export const postLogin = async (params: AuthLoginParams) =>  api.query(API_ROUTES.AUTH_POST_LOGIN, {
    method: 'POST',
    body: JSON.stringify(params),
});