import { Link } from '@tanstack/react-router';
import { ThemeSwitch } from '@features/theme';
import { AuthActions } from '@features/auth';
import { Badge } from '../badge';
import { Logo } from './logo';
import './style.css';
import { appRoutes } from '@src/appRoutes';

const isDevMode = import.meta.env.MODE === 'development';

export function Header() {
  return (
    <header className="header">
      <div className="header__left">
        {isDevMode && (
          <Badge color="yellow" size="s" className="header__badge">
            DEV
          </Badge>
        )}
        <Link to={appRoutes.index} className="header__title">
          <Logo />
          <h1>LM Publisher</h1>
        </Link>
      </div>
      <div className="header__right">
        <AuthActions />
        <ThemeSwitch minified size="s" />
      </div>
    </header>
  );
}
