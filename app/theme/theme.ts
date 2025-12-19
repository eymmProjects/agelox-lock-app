// src/theme/theme.ts
export type Theme = {
  mode: "dark" | "light";
  colors: {
    bg0: string;
    bg1: string;
    card: string;
    border: string;
    text: string;
    muted: string;
    primary: string;
    pill: string;
    danger: string;
    success: string;
  };
};

export const darkTheme: Theme = {
  mode: "dark",
  colors: {
    bg0: "#020617",
    bg1: "#020617",
    card: "#0B1220",
    border: "#1F2937",
    text: "#F9FAFB",
    muted: "#9CA3AF",
    primary: "#22D3EE",
    pill: "#111827",
    danger: "#EF4444",
    success: "#22C55E",
  },
};

export const lightTheme: Theme = {
  mode: "light",
  colors: {
    bg0: "#F8FAFC",
    bg1: "#EEF2FF",
    card: "#FFFFFF",
    border: "#E5E7EB",
    text: "#0F172A",
    muted: "#475569",
    primary: "#0891B2",
    pill: "#F1F5F9",
    danger: "#DC2626",
    success: "#16A34A",
  },
};
