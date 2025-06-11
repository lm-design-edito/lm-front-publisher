import { api } from "../../..";
import type { APIREsponseSuccessType } from "../../../query";
import API_ROUTES from "../../../routes";

type WhoAmIParams = {};

export type WhoAmIResponse = APIREsponseSuccessType & {
    payload: {
        badges: string[];
        _id: string;
        verified: boolean;
        role: string;
        status: string;
        email: string;
        username: string;
        isEmailVerified: boolean;
        isAdmin: boolean;
    }
}

export const whoAmI = async (params: WhoAmIParams): Promise<WhoAmIResponse> => api.query(API_ROUTES.AUTH_POST_WHOAMI, {
    method: 'POST',
    body: JSON.stringify(params),
});