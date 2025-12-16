import { appRoutes } from '@src/appRoutes';
import { redirect } from '@tanstack/react-router';
import type { RouterContext } from './routes/__root';

export const checkForAuthentifacted = ({
  context,
}: {
  context: RouterContext;
}) => {
  if (context.auth.isLoading) {
    return;
  }

  if (!context.auth.isLoading && !context.auth.isAuthenticated) {
    throw redirect({
      to: appRoutes.login,
      search: {
        redirect: location.href,
      },
    });
  }
};
