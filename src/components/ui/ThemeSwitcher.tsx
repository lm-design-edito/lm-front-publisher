import { useTheme } from "../../contexts/theme/useTheme";

export default function ThemeSwitcher() {
  const { theme, applyTheme } = useTheme();

  const toggleTheme = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
        <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    )
 }