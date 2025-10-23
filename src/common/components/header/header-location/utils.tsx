export const relativeRoutes = [
  {
    path: 'login',
    name: 'Login',
  },
  {
    path: 'signup',
    name: 'Inscription',
  },
  {
    path: 'account',
    name: 'Mon compte',
  },
  {
    path: 'verify-email',
    name: "Valider l'inscription",
  },
  {
    path: 'admin/users',
    name: 'Liste des utilisateurs',
  },
  {
    path: 'image/formatter',
    name: 'Image Formatter',
  },
  {
    path: 'image/resize',
    name: 'Image Resizer',
  },
  {
    path: 'image/convert',
    name: 'Image Converter',
  },
  {
    path: 'image/optimize',
    name: 'Image Optimizer',
  },
  {
    path: 'image/generator',
    name: "Générateur de média d'appels",
  },
  {
    path: 'image/tiny-lmg',
    name: 'Tiny LMG',
  },
];

const BASE_URL = import.meta.env.BASE_URL; // Récupère automatiquement la base de Vite

export const getLocationName = (pathname: string) => {
  if (!pathname) {
    return null;
  }

  const cleanedPathName = pathname.replace(BASE_URL, '');
  const foundRoute = relativeRoutes.find(route =>
    cleanedPathName.includes(route.path),
  );
  if (foundRoute) {
    return foundRoute.name;
  }
  return cleanedPathName.replace('/', '');
};
