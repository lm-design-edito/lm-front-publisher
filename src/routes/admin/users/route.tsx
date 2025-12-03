import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/users')({
  staticData: {
    getBreadcrumb: () => 'Utilisateurs',
  },
  component: () => <Outlet />, // ✅ Rend les routes enfants
});
