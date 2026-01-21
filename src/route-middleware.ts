import { appRoutes } from '@src/appRoutes';
import { redirect } from '@tanstack/react-router';
import type { RouterContext } from './routes/__root';
import { Logger } from '@utils/logger';

export const checkForAuthentifacted = ({
  context,
}: {
  context: RouterContext;
}) => {
  if (context.auth.isLoading) {
    return;
  }
  if (!context.auth.isLoading && !context.auth.isAuthenticated) {
    Logger.redirection(
      'RouteMiddleware:',
      'User is not authenticated, redirecting to login page',
    );
    throw redirect({
      to: appRoutes.login,
      search: {
        redirect: location.href,
      },
    });
  }
};
