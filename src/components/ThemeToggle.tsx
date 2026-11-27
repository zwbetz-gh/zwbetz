import { useEffect, useState } from "react";

const THEME_MODES = ["auto", "light", "dark"] as const;
type ThemeMode = (typeof THEME_MODES)[number];
type ResolvedTheme = Exclude<ThemeMode, "auto">;

const THEME_LABELS: Record<ThemeMode, string> = {
  auto: "Auto",
  light: "Light",
  dark: "Dark",
};

function isThemeMode(value: unknown): value is ThemeMode {
  return THEME_MODES.some((mode) => mode === value);
}

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "auto";
  }

  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem("theme");
  } catch {}
  if (isThemeMode(stored)) {
    return stored;
  }

  return "auto";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode !== "auto") {
    return mode;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyThemeMode(mode: ThemeMode) {
  const resolved = resolveTheme(mode);

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);

  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }

  document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    applyThemeMode(initialMode);
  }, []);

  useEffect(() => {
    if (mode !== "auto") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [mode]);

  function changeMode(nextMode: ThemeMode) {
    setMode(nextMode);
    applyThemeMode(nextMode);
    try {
      window.localStorage.setItem("theme", nextMode);
    } catch {}
  }

  return (
    <select
      value={mode}
      onChange={(event) => {
        const nextMode = event.currentTarget.value;
        if (isThemeMode(nextMode)) {
          changeMode(nextMode);
        }
      }}
      aria-label="Theme"
      className="theme-toggle"
    >
      {THEME_MODES.map((themeMode) => (
        <option key={themeMode} value={themeMode}>
          {THEME_LABELS[themeMode]}
        </option>
      ))}
    </select>
  );
}
