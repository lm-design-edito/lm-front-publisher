import { Link, useMatches, useRouterState } from '@tanstack/react-router';
import './style.css';
import { appRoutes } from '@src/appRoutes';

export const Breadcrumb = () => {
  const matches = useMatches();
  const isHomePage = useRouterState({
    select: s => s.location.pathname === '/',
  });

  const breadcrumb = matches
    .filter(match => {
      if (
        match &&
        match.staticData &&
        (match.staticData.getBreadcrumb || match.staticData.title)
      ) {
        return true;
      }
      if (match.routeId !== '__root__') {
        console.log(
          'Missing static data for breadcrumb in route:',
          match.routeId,
        );
      }
    }) // ✅ Filtre seulement si getBreadcrumb existe
    .map(match => {
      const title = match.staticData.getBreadcrumb
        ? match.staticData.getBreadcrumb({
            params: match.params,
            pathname: match.pathname,
            routeId: match.routeId,
          })
        : match.staticData.title;

      if (!title) {
        console.log('Breadcrumb title is empty for route:', match.routeId);
      }
      return {
        title,
        path: match.pathname,
      };
    });

  // Ne pas afficher le breadcrumb sur la page d'accueil
  if (isHomePage || breadcrumb.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to={appRoutes.index} className="breadcrumb__link">
        Accueil
      </Link>

      {breadcrumb.map((crumb, index) => (
        <Link
          key={crumb.path}
          to={crumb.path}
          className="breadcrumb__link"
          aria-current={index === breadcrumb.length - 1 ? 'page' : undefined}
        >
          {crumb.title}
        </Link>
      ))}
    </nav>
  );
};
