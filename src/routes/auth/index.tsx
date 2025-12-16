import { appRoutes } from '@src/appRoutes';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  staticData: {
    // No breadcrumb for the /auth/ route
    title: 'Authentification',
  },
  component: RouteComponent,
  beforeLoad: async () => {
    throw redirect({
      to: appRoutes.index,
      search: {
        redirect: location.href,
      },
    });
  },
});

function RouteComponent() {
  return <div>Hello "/auth/"!</div>;
}
