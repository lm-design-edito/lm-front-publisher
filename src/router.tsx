import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

const isProd = import.meta.env.MODE === 'production';

// Create a new router instance
export const router = createRouter({
  routeTree,
  basepath: isProd ? '/lm-front-publisher/' : '',
  context: {
    auth: {
      isAuthenticated: false,
      isLoading: true,
    },
    queryClient: undefined,
    toaster: undefined,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
