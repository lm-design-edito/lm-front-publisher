import { Button } from '../../../../components/buttons/Button';
import { useTheme } from '../../hooks/use-theme';

import './style.css';

export type ThemeSwitchProps = {
  className?: string;
  minified?: boolean;
  size?: 's' | 'm' | 'l';
};

export function ThemeSwitch({
  className = '',
  minified,
  size = 'm',
}: ThemeSwitchProps) {
  const { theme, applyTheme } = useTheme();

  const toggleTheme = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      className={`theme-switch ${className} ${minified ? 'theme-switch_minified' : ''}`}
      aria-label="Changer le thème"
      variant="secondary"
      onClick={toggleTheme}
      size={size}
    >
      {minified
        ? theme === 'light'
          ? '☀️'
          : '🌙'
        : theme === 'light'
          ? 'Passer en Dark Mode'
          : 'Passer en Light Mode'}
    </Button>
  );
}
