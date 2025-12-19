import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemePreference = "light" | "dark" | "auto";
export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme_preference";

const lightTheme = {
  mode: "light" as ThemeMode,
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "rgba(15,23,42,0.12)",
  text: "#0F172A",
  muted: "#64748B",
  accent: "#2563EB",
};

const darkTheme = {
  mode: "dark" as ThemeMode,
  bg: "#020617",
  card: "#020617",
  border: "#111827",
  text: "#E5E7EB",
  muted: "#9CA3AF",
  accent: "#2563EB",
};

// ✅ Theme is a shared shape (works for both light & dark)
export type Theme = typeof lightTheme;

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;                 // effective mode
  preference: ThemePreference;     // user choice: light/dark/auto
  setPreference: (p: ThemePreference) => void; // ✅ sync signature
};

const ThemeCtx = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme(); // "light" | "dark" | null
  const [preference, setPreferenceState] = useState<ThemePreference>("auto");

  // Load saved preference
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark" || saved === "auto") {
          setPreferenceState(saved);
        }
      } catch {
        // ignore storage errors
      }
    })();
  }, []);

  // Compute effective mode
  const mode: ThemeMode = useMemo(() => {
    if (preference === "auto") return systemScheme === "dark" ? "dark" : "light";
    return preference;
  }, [preference, systemScheme]);

  // Compute theme object
  const theme: Theme = useMemo(() => {
    return mode === "dark" ? darkTheme : lightTheme;
  }, [mode]);

  // ✅ Keep setPreference sync (and persist in background)
  const setPreference = (p: ThemePreference) => {
    setPreferenceState(p);
    AsyncStorage.setItem(STORAGE_KEY, p).catch(() => {});
  };

  return (
    <ThemeCtx.Provider value={{ theme, mode, preference, setPreference }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

