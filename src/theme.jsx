// theme.js
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // 🎨 Light Mode Colors
          primary: {
            main: "#1976d2",
          },
          background: {
            default: "#f5f7fa",
            paper: "#ffffff",
          },
          text: {
            primary: "#111827",
            secondary: "#374151",
          },
          divider: "#e5e7eb",
        }
      : {
          // 🌙 Dark Mode Colors
          primary: {
            main: "#60a5fa",
          },
          background: {
            default: "#0b1020",
            paper: "#121a2f",
          },
          text: {
            primary: "#e5e7eb",
            secondary: "#9ca3af",
          },
          divider: "#26314f",
        }),
  },
});
