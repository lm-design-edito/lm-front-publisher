import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api';
import { useUserGetUploadQuota } from '../use-user-get-upload-quota';

type useUserGetParams = {
  _id: string;
};

export function useUserGet(params: useUserGetParams) {
  const {
    data: dataUser,
    isSuccess: isSuccessUser,
    isLoading: isLoadingUser,
  } = useQuery({
    queryKey: ['user-get', params._id],
    queryFn: () => {
      return api.queries.admin.users.get(params);
    },
  });

  const { isLoading: isLoadingUploadQuota, uploadQuota } =
    useUserGetUploadQuota({ _id: params._id });

  const returnProps = {
    isLoading: isLoadingUploadQuota || isLoadingUser,
    user: null,
    uploadQuota: uploadQuota,
  };

  if (!isLoadingUser && isSuccessUser && dataUser.success) {
    return {
      ...returnProps,
      user: dataUser?.payload || null,
      uploadQuota,
    };
  } else {
    return returnProps;
  }
}
