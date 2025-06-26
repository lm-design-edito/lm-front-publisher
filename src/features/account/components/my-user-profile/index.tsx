import { Loader } from '../../../../common-components/Loader';
import { UserBadge } from '../../../../common-components/user/UserBadge';
import { FieldSet } from '../../../../common-components/forms-/fieldset';
import { UserStatus } from '../../../../common-components/user/UserStatus';
import { UserVerified } from '../../../../common-components/user/UserVerified';
import { UserRole } from '../../../../common-components/user/UserRole';
import {
  useWhoAmI,
  LogoutButton,
  LogoutEverywhereButton,
} from '@features/authentification';
import { ThemeSwitch } from '@features/theme';

export const MyUserProfile = () => {
  const { user, isLoading } = useWhoAmI();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="lm-publisher-flex lm-publisher-flex-column lm-publisher-flex-spacer-2">
          <FieldSet legend="ID">{user?._id || 'Aucun ID défini'}</FieldSet>
          <div className="lm-publisher-flex lm-publisher-flex-wrap lm-publisher-flex-spacer">
            <FieldSet
              legend="Nom utilisateur"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                            lm-publisher-flex-spacer"
            >
              {user?.username || "Aucun nom d'utilisateur défini"}
            </FieldSet>
            <FieldSet
              legend="Email"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              {user?.email || 'Aucun email défini'}
            </FieldSet>
          </div>
          <div className="lm-publisher-flex lm-publisher-flex-wrap lm-publisher-flex-spacer">
            <FieldSet
              legend="Statut"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserStatus status={user?.status || 'Aucun statut défini'} />
            </FieldSet>
            <FieldSet
              legend="État"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserVerified verified={user?.verified || false} />
            </FieldSet>
            <FieldSet
              legend="Rôle"
              className="lm-publisher-flex-1"
              contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
            >
              <UserRole role={user?.role || 'Aucun rôle défini'} />
            </FieldSet>
          </div>
          <FieldSet
            legend="Badges"
            contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                        lm-publisher-flex-spacer"
          >
            {user?.badges && user?.badges.length ? (
              user?.badges.map(badge => <UserBadge key={badge} badge={badge} />)
            ) : (
              <span>Aucun badge</span>
            )}
          </FieldSet>
        </div>
      )}
      <div></div>
      <FieldSet
        legend="Préférences"
        className="lm-publisher-m-spacer-3"
        contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                lm-publisher-flex-spacer"
      >
        <ThemeSwitch />
      </FieldSet>
      <FieldSet
        legend="Déconnexion"
        className="lm-publisher-m-spacer-8"
        contentClassName="lm-publisher-flex lm-publisher-flex-wrap 
                lm-publisher-flex-spacer"
      >
        <LogoutButton size="m" />
        <LogoutEverywhereButton size="m" />
      </FieldSet>
    </div>
  );
};
