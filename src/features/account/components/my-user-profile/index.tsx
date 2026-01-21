import { Loader } from '@common/components/loader';
import { UserBadge } from '@common/components/user/user-badge';
import { Form } from '@common/components/forms';
import { UserStatus } from '@common/components/user/user-status';
import { UserVerified } from '@common/components/user/user-verified';
import { UserRole } from '@common/components/user/user-role';
import {
  useWhoAmI,
  LogoutButton,
  LogoutEverywhereButton,
} from '@features/auth';
import { ThemeSwitch } from '@features/theme';
import { ClearImageUploadIdsCacheButton } from '@features/image-tools/generator';
import { Display } from '@common/components/display';
import { ButtonLink } from '@common/components/buttons/button-link';
import { appRoutes } from '@src/appRoutes';

export const MyUserProfile = () => {
  const { user, isLoading } = useWhoAmI();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="lm-publisher-flex lm-publisher-flex-column lm-publisher-flex-spacer-2">
          <Form.Fieldset legend="ID">
            {user?._id || 'Aucun ID défini'}
          </Form.Fieldset>
          <Display type="flex" wrap gap={1}>
            <Form.Fieldset
              legend="Nom utilisateur"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                            lm-publisher-flex-spacer"
            >
              {user?.username || "Aucun nom d'utilisateur défini"}
            </Form.Fieldset>
            <Form.Fieldset
              legend="Email"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              {user && 'email' in user ? user?.email : 'Aucun email défini'}
            </Form.Fieldset>
          </Display>
          <Display type="flex" wrap gap={1}>
            <Form.Fieldset
              legend="Statut"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserStatus
                status={
                  user && 'status' in user ? user.status : 'Aucun statut défini'
                }
              />
            </Form.Fieldset>
            <Form.Fieldset
              legend="État"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserVerified verified={user?.verified || false} />
            </Form.Fieldset>
            <Form.Fieldset
              legend="Rôle"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserRole role={user?.role || 'Aucun rôle défini'} />
            </Form.Fieldset>
          </Display>
          <Form.Fieldset
            legend="Badges"
            contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
          >
            {user?.badges && user?.badges.length ? (
              user?.badges.map(badge => <UserBadge key={badge} badge={badge} />)
            ) : (
              <span>Aucun badge</span>
            )}
          </Form.Fieldset>
        </div>
      )}
      <div></div>
      <Form.Fieldset
        legend="Préférences"
        className="lm-publisher-m-spacer-3"
        contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                lm-publisher-flex-spacer"
      >
        <ThemeSwitch />
      </Form.Fieldset>
      <Form.Fieldset
        legend="Gestion du cache"
        className="lm-publisher-m-spacer-8"
      >
        <ClearImageUploadIdsCacheButton buttonProps={{ size: 'm' }} />
      </Form.Fieldset>

      <Form.Fieldset legend="Sécurité">
        <ButtonLink to={appRoutes.requestNewPassword} variant="secondary">
          Aller à la page de réinitialisation mon mot de passe
        </ButtonLink>
      </Form.Fieldset>
      <Form.Fieldset
        legend="Déconnexion"
        className="lm-publisher-m-spacer-8"
        contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                lm-publisher-flex-spacer"
      >
        <LogoutButton size="m" />
        <LogoutEverywhereButton size="m" />
      </Form.Fieldset>
    </div>
  );
};
