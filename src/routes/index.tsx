import { createFileRoute } from '@tanstack/react-router';
import { useWhoAmI } from '@features/auth';
import { ServiceList } from '@features/services';

import './style.css';
import { AuthActions } from '../features/auth';

const IndexPage = () => {
  const { isAuthenticated } = useWhoAmI();

  return (
    <div className="index-page">
      <div className="index-page__top">
        <h1>
          Bienvenue sur <span className="accent">LM Publisher</span>.
        </h1>
        <p>
          Outils utiles à la publicaiton de formats (création, optimisation
          d'images...).
        </p>
        <p>
          Pour toute question, besoin de support :{' '}
          <span className="accent">fabas@lemonde.fr</span>
        </p>

        <div className="lm-publisher-m-t-spacer-8">
          <small>La team Design Edito.</small>
        </div>
      </div>
      {isAuthenticated ? (
        <div className="index-page__content">
          <ServiceList className="lm-publisher-m-spacer-8" />
        </div>
      ) : (
        <AuthActions className="lm-publisher-m-spacer-8" size="l" />
      )}
    </div>
  );
};

export const Route = createFileRoute('/')({
  staticData: {
    getBreadcrumb: () => 'Accueil',
    title: 'LM Publisher',
  },
  component: IndexPage,
});
