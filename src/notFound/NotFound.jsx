/**
 * NotFound Page
 * -------------
 * Reusable 404 screen providing a branded error state
 * with contextual messaging and navigation actions.
 */

import React from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        background: isDark
          ? `radial-gradient(circle at top, rgba(80,80,120,0.6), ${theme.palette.background.default})`
          : `radial-gradient(circle at top, rgba(25,118,210,0.10), ${theme.palette.background.default})`,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          bgcolor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: 8,
          p: { xs: 3, sm: 4 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: isDark
              ? "linear-gradient(135deg, rgba(144,202,249,0.15), rgba(21,101,192,0.25))"
              : "linear-gradient(135deg, rgba(25,118,210,0.10), rgba(21,101,192,0.30))",
            top: -80,
            right: -60,
            filter: "blur(1px)",
            opacity: 0.9,
          }}
        />

        <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3.5rem", sm: "4.5rem" },
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: theme.palette.primary.main,
              textShadow: isDark
                ? "0 2px 10px rgba(0,0,0,0.7)"
                : "0 2px 10px rgba(0,0,0,0.15)",
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 480,
            }}
          >
            The page you’re looking for doesn’t exist, has been removed, or the
            URL may be incorrect. You can return to your dashboard or go back to
            the previous page.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<HomeOutlinedIcon />}
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 2.8,
              }}
            >
              Back to Dashboard
            </Button>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 16 }} />}
              onClick={() => navigate(-1)}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                px: 2.4,
              }}
            >
              Go Back
            </Button>
          </Stack>

          <Typography
            variant="caption"
            sx={{
              mt: 2.5,
              color: theme.palette.text.secondary,
              opacity: 0.8,
            }}
          >
            If this issue continues, please verify the URL or contact the system
            administrator.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
