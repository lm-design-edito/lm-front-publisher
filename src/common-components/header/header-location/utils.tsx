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
    path: 'check-email',
    name: "Valider l'inscription",
  },
  {
    path: 'admin/users',
    name: 'Liste des utilisateurs',
  },
  {
    path: 'images/formatter',
    name: 'Image Formatter',
  },
  {
    path: 'images/resize',
    name: 'Image Resizer',
  },
  {
    path: 'images/convert',
    name: 'Image Converter',
  },
  {
    path: 'images/optimize',
    name: 'Image Optimizer',
  },
  {
    path: 'images/generator',
    name: "Générateur de média d'appels",
  },
  {
    path: 'images/tiny-lmg',
    name: 'Tiny LMG',
  },
];

export const getLocationName = (pathname: string) => {
  if (!pathname) {
    return null;
  }

  const foundRoute = relativeRoutes.find(route =>
    pathname.includes(route.path),
  );
  if (foundRoute) {
    return foundRoute.name;
  }
  return pathname.replace('/', '');
};
