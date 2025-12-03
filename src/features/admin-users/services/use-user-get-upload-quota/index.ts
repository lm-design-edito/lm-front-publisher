import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api';

type useUserGetParams = {
  _id: string;
};

export function useUserGetUploadQuota(params: useUserGetParams) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['user-get-upload-quota', params._id],
    queryFn: () => {
      return api.queries.admin.users.getUploadQuota({
        userId: params._id,
      });
    },
  });

  const returnProps = {
    isLoading: isLoading,
    uploadQuota: null,
  };

  if (!isLoading && isSuccess && data.success) {
    return {
      ...returnProps,
      uploadQuota: data?.payload || null,
    };
  } else {
    return returnProps;
  }
}
