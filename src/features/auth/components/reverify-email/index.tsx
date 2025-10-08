import { Display } from '@common-components/display';
import { Loader } from '@common-components/loader';
import { QueriesStatus } from '@common-components/queries-status';
import { Text } from '@common-components/text';
import { useRequestEmailVerificationToken } from '@features/auth/api/use-request-email-verification-token';
import { Logger } from '@utils/logger';
import { useState } from 'react';

type ReverifyEmailProps = {
  email: string;
};

export const ReverifyEmail = ({ email }: ReverifyEmailProps) => {
  const [apiError, setAPIError] = useState('');
  const { mutate: requestEmailVerificationToken, isPending } =
    useRequestEmailVerificationToken({
      onSuccess: () => {
        setAPIError('');
        Logger.success('useRequestEmailVerificationToken');
      },
      onError: error => {
        Logger.error('useRequestEmailVerificationToken', error);
        setAPIError(error.message);
      },
    });
  return (
    <Display type={'flex'} direction={'column'} align={'center'}>
      <Text align="center" size="sm">
        Vous n'avez pas reçu l'email ou le code a expiré ?
      </Text>
      <Text align="center" size="sm">
        <span
          className={'accent-link'}
          onClick={() =>
            requestEmailVerificationToken({
              email,
            })
          }
        >
          Renvoyer un code à : {email}
        </span>
      </Text>
      {isPending && <Loader />}
      {apiError && <QueriesStatus status={'error'}>{apiError}</QueriesStatus>}
    </Display>
  );
};
