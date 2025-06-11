import { useTheme } from "../../hooks/useTheme";

export default function ThemeSwitch() {
  const { theme, applyTheme } = useTheme();

  const toggleTheme = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="lmui-button lmui-button_secondary lmui-button_s"
      aria-label="Toggle theme"
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}