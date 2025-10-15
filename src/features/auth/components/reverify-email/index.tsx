import { Display } from '@common/components/display';
import { Loader } from '@common/components/loader';
import { Text } from '@common/components/text';
import { ToastContext } from '@common/providers/toast/toastContext';
import { useRequestEmailVerificationToken } from '@features/auth/api/use-request-email-verification-token';
import { Logger } from '@utils/logger';
import { useContext } from 'react';

type ReverifyEmailProps = {
  email: string;
};

export const ReverifyEmail = ({ email }: ReverifyEmailProps) => {
  const { showToast } = useContext(ToastContext);
  const { mutate: requestEmailVerificationToken, isPending } =
    useRequestEmailVerificationToken({
      onSuccess: () => {
        showToast({
          type: 'success',
          message: `Un nouveau code de vérification a été envoyé à ${email}.`,
          withCloseBtn: true,
        });
        Logger.success('useRequestEmailVerificationToken');
      },
      onError: error => {
        Logger.error('useRequestEmailVerificationToken', error);
        showToast({
          type: 'error',
          message: error.message,
        });
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
    </Display>
  );
};
