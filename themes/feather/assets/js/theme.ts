/**
 * Adapted from https://getbootstrap.com/docs/5.3/customize/color-modes/#javascript
 */

type ThemeType = 'light' | 'dark' | 'auto';

const main = (): void => {
  const preferredTheme = getPreferredTheme();

  getThemeToggleEl().value = preferredTheme;
  setStoredTheme(preferredTheme);
  setTheme(preferredTheme);

  window.addEventListener('DOMContentLoaded', () => {
    getThemeToggleEl().addEventListener('change', () => {
      const selectedTheme = getThemeToggleEl().value as ThemeType;
      setStoredTheme(selectedTheme);
      setTheme(selectedTheme);
    });
  });
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
    document.documentElement.setAttribute('data-bs-theme', prefersDark() ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};

main();
