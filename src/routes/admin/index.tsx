import { createFileRoute, redirect } from '@tanstack/react-router';
import { appRoutes } from '@src/appRoutes';

export const Route = createFileRoute('/admin/')({
  staticData: {
    getBreadcrumb: () => 'Admin',
    title: 'Administration',
  },
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && !context.auth.isAuthenticated) {
      throw redirect({
        to: appRoutes.login,
        search: {
          redirect: location.href,
        },
      });
    }
    // This is a placeholder for any pre-load logic you might want to implement
    // For example, you could check user permissions or load initial data
    console.log('Loading admin route...');
  },
});

function RouteComponent() {
  return <div>Hello "/admin/"!</div>;
}
