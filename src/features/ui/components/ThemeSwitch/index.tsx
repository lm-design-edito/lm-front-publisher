import Button from "../../../../components/buttons/Button";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeSwitch() {
  const { theme, applyTheme } = useTheme();

  const toggleTheme = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      aria-label="Toggle theme" 
      variant="secondary"
      onClick={toggleTheme}
      size="s"
    >{theme === 'light' ? "☀" : "☽" }</Button>
  )
}