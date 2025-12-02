import { Loader } from '@common/components/loader';
import { UserBadge } from '@common/components/user/user-badge';
import { FormFieldset } from '@common/components/forms/form-fieldset';
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

export const MyUserProfile = () => {
  const { user, isLoading } = useWhoAmI();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="lm-publisher-flex lm-publisher-flex-column lm-publisher-flex-spacer-2">
          <FormFieldset legend="ID">{user?._id || 'Aucun ID défini'}</FormFieldset>
          <div className="lm-publisher-flex lm-publisher-flex-wrap lm-publisher-flex-spacer">
            <FormFieldset
              legend="Nom utilisateur"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                            lm-publisher-flex-spacer"
            >
              {user?.username || "Aucun nom d'utilisateur défini"}
            </FormFieldset>
            <FormFieldset
              legend="Email"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              {user && 'email' in user ? user?.email : 'Aucun email défini'}
            </FormFieldset>
          </div>
          <div className="lm-publisher-flex lm-publisher-flex-wrap lm-publisher-flex-spacer">
            <FormFieldset
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
            </FormFieldset>
            <FormFieldset
              legend="État"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserVerified verified={user?.verified || false} />
            </FormFieldset>
            <FormFieldset
              legend="Rôle"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserRole role={user?.role || 'Aucun rôle défini'} />
            </FormFieldset>
          </div>
          <FormFieldset
            legend="Badges"
            contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
          >
            {user?.badges && user?.badges.length ? (
              user?.badges.map(badge => <UserBadge key={badge} badge={badge} />)
            ) : (
              <span>Aucun badge</span>
            )}
          </FormFieldset>
        </div>
      )}
      <div></div>
      <FormFieldset
        legend="Préférences"
        className="lm-publisher-m-spacer-3"
        contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                lm-publisher-flex-spacer"
      >
        <ThemeSwitch />
      </FormFieldset>
      <FormFieldset legend="Gestion du cache" className="lm-publisher-m-spacer-8">
        <ClearImageUploadIdsCacheButton buttonProps={{ size: 'm' }} />
      </FormFieldset>
      <FormFieldset
        legend="Déconnexion"
        className="lm-publisher-m-spacer-8"
        contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                lm-publisher-flex-spacer"
      >
        <LogoutButton size="m" />
        <LogoutEverywhereButton size="m" />
      </FormFieldset>
    </div>
  );
};
