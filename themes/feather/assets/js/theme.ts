/**
 * Adapted from https://getbootstrap.com/docs/5.3/customize/color-modes/#javascript
 */

type ThemeType = 'light' | 'dark' | 'auto';

const main = (): void => {
  // Put this JS file at top of body, then set theme early, to prevent the "flash of light mode"
  const preferredTheme = getPreferredTheme();
  setStoredTheme(preferredTheme);
  setTheme(preferredTheme);

  // Wait for toggle el
  window.addEventListener('DOMContentLoaded', () => {
    getToggleEl().value = preferredTheme;

    getToggleEl().addEventListener('change', () => {
      const selectedTheme = getToggleEl().value as ThemeType;
      setStoredTheme(selectedTheme);
      setTheme(selectedTheme);
    });
  });
};

const getToggleEl = (): HTMLSelectElement => {
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
