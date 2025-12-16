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
    // This is a placeholder for any pre-load logic you might want to implement
    // For example, you could check user permissions or load initial data
    console.log('Loading admin route...');
  },
});

function RouteComponent() {
  return <div>Hello "/admin/"!</div>;
}
