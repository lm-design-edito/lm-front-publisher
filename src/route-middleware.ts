import { appRoutes } from '@src/appRoutes';
import type { CustomRouteContext } from './router';
import { redirect } from '@tanstack/react-router';

export const checkForAuthentifacted = ({
  context,
}: {
  context: CustomRouteContext;
}) => {
  if (!context.auth.isLoading && !context.auth.isAuthenticated) {
    throw redirect({
      to: appRoutes.login,
      search: {
        redirect: location.href,
      },
    });
  }
};
