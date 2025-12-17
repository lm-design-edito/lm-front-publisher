import { createFileRoute } from '@tanstack/react-router';
import { checkForAuthentifacted } from '@src/route-middleware';

export const Route = createFileRoute('/admin/')({
  staticData: {
    getBreadcrumb: () => 'Admin',
    title: 'Administration',
  },
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    checkForAuthentifacted({ context });
  },
});

function RouteComponent() {
  return <div>Hello "/admin/"!</div>;
}
