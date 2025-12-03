import { adminUsersList } from './list';
import { adminUsersGet } from './get';
import { adminUsersUpdate } from './update';
import { adminUsersGetUploadQuota } from './get-upload-quota';
import { adminUsersResetUploadQuota } from './reset-upload-quota';

export const users = {
  list: adminUsersList,
  get: adminUsersGet,
  update: adminUsersUpdate,
  getUploadQuota: adminUsersGetUploadQuota,
  resetUploadQuota: adminUsersResetUploadQuota,
};
