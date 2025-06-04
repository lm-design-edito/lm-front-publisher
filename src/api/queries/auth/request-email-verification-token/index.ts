import { api } from "../../..";
import API_ROUTES from "../../../routes";

type RequestEmailVerificationTokenType = {
    email: string
};

export const postRequestEmailVerificationToken = async (params: RequestEmailVerificationTokenType) =>  api.query(API_ROUTES.AUTH_POST_REQUEST_EMAIL_VERIFICATION_TOKEN, {
    method: 'POST',
    body: JSON.stringify(params),
});