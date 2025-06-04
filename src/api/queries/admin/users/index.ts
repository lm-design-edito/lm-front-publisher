import { api } from "../../..";
import API_ROUTES from "../../../routes";

type AdminUsersUpdate = {
    _id: string,
    role?: 'root' | 'admin' | 'user',
    status?: 'active' | 'suspended' | 'banned',
    verified?: boolean,
    email?: string
    password?: string
    googleId?: string
};

export const postAdminUsersUpdate = async (params: AdminUsersUpdate) => api.query(API_ROUTES.ADMIN_USERS_UPDATE, {
    method: 'POST',
    body: JSON.stringify(params),
});