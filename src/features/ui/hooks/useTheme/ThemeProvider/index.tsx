import { useCallback, useEffect, useState } from "react";
import { ThemeContext, type Theme } from "..";

const THEME_KEY = 'lm-publisher-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system');

    const applyTheme = useCallback((theme: Theme) => {
        setTheme(theme);
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.setAttribute('data-color-mode', theme);
    }, []);

    useEffect(() => {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
        const storedTheme =  (localStorage.getItem(THEME_KEY) as Theme) || systemTheme || 'light';
        applyTheme(storedTheme);
    }, [applyTheme]);

    return (
        <ThemeContext.Provider value={{theme, applyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
