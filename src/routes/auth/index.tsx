import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
  beforeLoad: async () => {
    throw redirect({
      to: '/',
      search: {
        redirect: location.href,
      },
    });
  },
});

function RouteComponent() {
  return <div>Hello "/auth/"!</div>;
}
