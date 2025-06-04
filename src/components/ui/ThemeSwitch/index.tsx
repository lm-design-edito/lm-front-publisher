import { useTheme } from "../../../contexts/theme/useTheme";

export default function ThemeSwitch() {
  const { theme, applyTheme } = useTheme();

  const toggleTheme = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}