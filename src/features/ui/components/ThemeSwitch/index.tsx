import Button from "../../../../components/buttons/Button";
import { useTheme } from "../../hooks/useTheme";

import './style.css';

export default function ThemeSwitch() {
  const { theme, applyTheme } = useTheme();

  const toggleTheme = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      className="theme-switch"
      aria-label="Changer le thème" 
      variant="secondary"
      onClick={toggleTheme}
      size="s"
    >{theme === 'light' ? "☀" : "☽" }</Button>
  )
}