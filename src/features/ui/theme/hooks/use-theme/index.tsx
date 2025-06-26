import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';
type ThemeContextType = {
  theme: Theme;
  applyTheme: (theme: Theme) => void;
};

// Create the context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  applyTheme: () => {},
});

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
