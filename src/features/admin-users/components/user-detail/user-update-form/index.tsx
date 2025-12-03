import { Form } from '@common/components/forms';
import { useForm } from 'react-hook-form';
import { userUpdateFormSchema, type UserUpdateFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Display } from '@common/components/display';

import {
  UserStatus,
  type UserStatusProps,
} from '@common/components/user/user-status';
import { UserVerified } from '@common/components/user/user-verified';
import { UserBadge } from '@common/components/user/user-badge';
import { UserRole } from '@common/components/user/user-role';
import { Text } from '@common/components/text';
import { Button } from '@common/components/buttons/button';
import { useUserResetUploadQuota } from '@features/admin-users/services/use-user-reset-upload-quota';
import { useToastContext } from '@common/hooks/useToastContext';
type UserDetailProps = {
  user: {
    _id: string;
    username: string;
    email?: string;
    role: string;
    verified: boolean;
    status: UserStatusProps['status'];
    badges: string[];
  };
  uploadQuota?: {
    dailyUploadsByteSize: number;
    monthlyUploadsByteSize: number;
    totalUploadsByteSize: number;
  };
};

export const UserUpdateForm = ({ user, uploadQuota }: UserDetailProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserUpdateFormSchema>({
    resolver: zodResolver(userUpdateFormSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  const { showToast } = useToastContext();
  const { mutate: userResetUploadQuota } = useUserResetUploadQuota({
    onSuccess: () => {
      showToast({
        type: 'success',
        message: "Le quota d'upload de l'utilisateur a été réinitialisé.",
      });
    },
    onError: error => {
      showToast({
        type: 'error',
        message: error.message,
      });
    },
  });

  const onSubmit = useCallback((values: UserUpdateFormSchema) => {
    console.log('TODO', values);
  }, []);

  const getUploadQuotaInMB = useCallback((byteSize: number) => {
    return `${(byteSize / (1024 * 1024)).toFixed(2)} MB`;
  }, []);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Fieldset legend="ID">{user?._id || 'N/A'}</Form.Fieldset>
      <Display type="flex" wrap gap={1}>
        <Form.Input
          label="Nom d'utilisateur"
          isValid={isValid}
          error={errors['username']}
          inputProps={{
            ...register('username'),
          }}
          className="lm-publisher-flex-1"
        />
        <Form.Input
          label="Email"
          isValid={isValid}
          error={errors['email']}
          inputProps={{
            type: 'email',
            ...register('email'),
          }}
          className="lm-publisher-flex-1"
        />
      </Display>
      <Display type="flex" wrap gap={1}>
        <Form.Fieldset
          legend="Statut"
          className="lm-publisher-flex-1"
          contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                              lm-publisher-flex-spacer"
        >
          <UserStatus
            status={
              user && 'status' in user ? user.status : 'Aucun statut défini'
            }
          />
        </Form.Fieldset>
        <Form.Fieldset
          legend="État"
          className="lm-publisher-flex-1"
          contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                              lm-publisher-flex-spacer"
        >
          <UserVerified verified={user?.verified || false} />
        </Form.Fieldset>
        <Form.Fieldset
          legend="Rôle"
          className="lm-publisher-flex-1"
          contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                              lm-publisher-flex-spacer"
        >
          <UserRole role={user?.role || 'Aucun rôle défini'} />
        </Form.Fieldset>
      </Display>
      <Form.Fieldset
        legend="Badges"
        contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                              lm-publisher-flex-spacer"
      >
        {user?.badges && user?.badges.length ? (
          user?.badges.map(badge => <UserBadge key={badge} badge={badge} />)
        ) : (
          <span>Aucun badge</span>
        )}
      </Form.Fieldset>
      <Form.Fieldset
        legend="Quota d'upload"
        contentClassName="lm-publisher-w-100"
      >
        {uploadQuota ? (
          <Display type="flex" direction="column" gap={1}>
            <Display type="flex" direction="column" gap={1}>
              <Text>
                Quota d'upload journalier:{' '}
                {getUploadQuotaInMB(uploadQuota.dailyUploadsByteSize)}
              </Text>
              <Text>
                Quota d'upload mensuel:{' '}
                {getUploadQuotaInMB(uploadQuota.dailyUploadsByteSize)}
              </Text>
              <Text>
                Quota d'upload total:{' '}
                {getUploadQuotaInMB(uploadQuota.dailyUploadsByteSize)}
              </Text>
            </Display>
            <Button
              type="button"
              role="button"
              variant="secondary"
              size="s"
              className="lm-publisher-flex-self-align-end"
              onClick={() => userResetUploadQuota({ _id: user._id })}
            >
              Reset les quotas
            </Button>
          </Display>
        ) : (
          <Text>Aucun quota trouvé</Text>
        )}
      </Form.Fieldset>
    </Form>
  );
};
