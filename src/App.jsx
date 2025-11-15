/**
 * App Shell
 * ---------
 * Root layout component wiring the global MUI theme, top navigation bar,
 * responsive sidebar, and routed page content.
 */

import * as React from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { getDesignTokens } from "./theme";
import { Outlet } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function App() {
  const initialMode = localStorage.getItem("currentMode") || "dark";
  const [mode, setMode] = React.useState(initialMode);

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          setMode={setMode}
        />

        <SideBar open={open} handleDrawerClose={handleDrawerClose} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "visible !important",
          }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
