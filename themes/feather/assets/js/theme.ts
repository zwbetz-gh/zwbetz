/**
 * Adapted from https://getbootstrap.com/docs/5.3/customize/color-modes/#javascript
 */

type ThemeType = 'light' | 'dark' | 'auto';

const main = (): void => {
  setThemeEverywhere(getPreferredTheme());

  getThemeToggleEl().addEventListener('change', () => {
    const selectedTheme = getThemeToggleEl().value as ThemeType;
    setThemeEverywhere(selectedTheme);
  });
};

const setThemeEverywhere = (theme: ThemeType): void => {
  getThemeToggleEl().value = theme;
  setStoredTheme(theme);
  setTheme(theme);
};

const getThemeToggleEl = (): HTMLSelectElement => {
  return document.querySelector('#custom_theme_toggle') as HTMLSelectElement;
};

const getPreferredTheme = (): ThemeType => {
  const storedTheme = getStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  return prefersDark() ? 'dark' : 'light';
};

const prefersDark = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getStoredTheme = (): ThemeType | null => {
  return localStorage.getItem('theme') as ThemeType;
};

const setStoredTheme = (theme: ThemeType) => {
  localStorage.setItem('theme', theme);
};

const setTheme = (theme: ThemeType) => {
  if (theme === 'auto') {
    const value: ThemeType = prefersDark() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', value);
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};

main();
