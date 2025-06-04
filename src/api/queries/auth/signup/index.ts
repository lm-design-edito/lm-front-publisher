import { api } from "../../..";
import API_ROUTES from "../../../routes";

type SignupParams = {
    username: string,
    password: string,
    email: string,
};

export const postSignup = async (params: SignupParams) =>  api.query(API_ROUTES.AUTH_POST_SIGNUP, {
    method: 'POST',
    body: JSON.stringify(params),
});