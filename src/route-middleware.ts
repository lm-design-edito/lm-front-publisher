import type { CustomRouteContext } from './router';
import { redirect } from '@tanstack/react-router';

export const checkForAuthentifacted = ({
  context,
}: {
  context: CustomRouteContext;
}) => {
  if (!context.auth.isLoading && !context.auth.isAuthenticated) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location.href,
      },
    });
  }
};
