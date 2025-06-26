import { useCallback, useEffect, useState } from 'react';
import { ThemeContext, type Theme } from '..';

const THEME_KEY = 'lm-publisher-theme';
const getWantedTheme = (): Theme => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  return (localStorage.getItem(THEME_KEY) as Theme) || systemTheme || 'light';
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getWantedTheme());

  const applyTheme = useCallback((theme: Theme) => {
    setTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-color-mode', theme);
  }, []);

  useEffect(() => {
    applyTheme(getWantedTheme());
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
