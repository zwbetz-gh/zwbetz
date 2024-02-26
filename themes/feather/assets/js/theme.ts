type ThemeType = 'light' | 'dark' | 'auto';

const main = (): void => {
  const preferredTheme = getPreferredTheme();

  getSelectEl().value = preferredTheme;
  setStoredTheme(preferredTheme);
  setTheme(preferredTheme);

  window.addEventListener('DOMContentLoaded', () => {
    getSelectEl().addEventListener('change', () => {
      const selectedTheme = getSelectEl().value as ThemeType;
      setStoredTheme(selectedTheme);
      setTheme(selectedTheme);
    });
  });
};

const getSelectEl = (): HTMLSelectElement => {
  return document.querySelector('#theme') as HTMLSelectElement;
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
