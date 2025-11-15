/**
 * Header Component
 * ----------------
 * A reusable page header used across the application.
 * Displays a title and optional subtitle with theme-aware styling.
 */

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function Header({ title, subTitle, isDashboard = false }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box mb={isDashboard ? 2 : 4}>
      <Typography
        variant="h5"
        sx={{
          color: isDark
            ? theme.palette.warning.light
            : theme.palette.info.main,
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>

      <Typography variant="body1">
        {subTitle}
      </Typography>
    </Box>
  );
}
