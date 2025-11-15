/**
 * Profile Page
 * -------------
 * User profile and settings screen that persists data to localStorage,
 * shows live last-login timing, and exposes theme and logout hooks.
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Chip,
  Button,
  IconButton,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function Profile({ onToggleTheme, onLogout }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const defaultUser = {
    name: "Mohamed Ali",
    email: "m.ali@example.com",
    phone: "+20 100 000 0000",
    role: "Member",
    status: "Online",
    avatar: "",
    storagePct: 42,
    used: "4.2GB",
    quota: "10GB",
    lastLoginISO: new Date().toISOString(),
  };

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("profile_user");
      if (!saved) return defaultUser;
      const parsed = JSON.parse(saved);
      return { ...defaultUser, ...parsed };
    } catch (e) {
      console.warn("Failed to parse profile_user from localStorage:", e);
      return defaultUser;
    }
  });

  useEffect(() => {
    localStorage.setItem("profile_user", JSON.stringify(user));
  }, [user]);

  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem("profile_prefs");
      if (!saved)
        return {
          emailNotifs: true,
          twoFA: false,
          autoSave: true,
        };
      const parsed = JSON.parse(saved);
      return {
        emailNotifs: true,
        twoFA: false,
        autoSave: true,
        ...parsed,
      };
    } catch (e) {
      console.warn("Failed to parse profile_prefs from localStorage:", e);
      return {
        emailNotifs: true,
        twoFA: false,
        autoSave: true,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("profile_prefs", JSON.stringify(prefs));
  }, [prefs]);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const relativeLastLogin = useMemo(() => {
    const diffSec = Math.floor(
      (now - new Date(user.lastLoginISO).getTime()) / 1000
    );
    const mins = Math.floor(diffSec / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (diffSec < 60) return "Just now";
    if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }, [now, user.lastLoginISO]);

  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
  });

  const openEdit = () => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
    });
    setEditOpen(true);
  };

  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    sev: "success",
  });

  const notify = (msg, sev = "success") => setSnack({ open: true, msg, sev });

  const closeSnack = () =>
    setSnack((prev) => ({
      ...prev,
      open: false,
    }));

  const saveEdit = () => {
    setUser((u) => ({ ...u, ...form }));
    setEditOpen(false);
    notify("Profile updated");
  };

  const handleToggleTheme = () => {
    if (typeof onToggleTheme === "function") {
      onToggleTheme();
      notify("Theme toggled");
    } else {
      const cur = localStorage.getItem("currentMode") || "light";
      const next = cur === "dark" ? "light" : "dark";
      localStorage.setItem("currentMode", next);
      notify(`Theme: ${next}`);
      setTimeout(() => window.location.reload(), 300);
    }
  };

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    } else {
      localStorage.removeItem("auth_token");
      notify("Logged out");
    }
  };

  return (
    <Box
      sx={{
        bgcolor:
          theme.palette.mode === "dark" ? "background.default" : "grey.50",
        minHeight: "100%",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              flexWrap="wrap"
            >
              <Box>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  sx={{
                    color: isDark
                      ? theme.palette.warning.light
                      : theme.palette.info.main,
                    fontWeight: 700,
                  }}
                >
                  Profile & Settings
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Manage your account information, preferences, and activity.
                </Typography>
              </Box>
              <IconButton onClick={handleToggleTheme} title="Toggle Theme">
                <Brightness4OutlinedIcon />
              </IconButton>
            </Stack>
          </Box>

          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
            }}
            elevation={4}
          >
            <CardContent>
              <Stack
                direction={isSmall ? "column" : "row"}
                spacing={3}
                alignItems={isSmall ? "center" : "flex-start"}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 96,
                    height: 96,
                    bgcolor: theme.palette.primary.main,
                    fontSize: "2rem",
                  }}
                >
                  {(user.name?.[0] || "U").toUpperCase()}
                </Avatar>

                <Stack spacing={1} sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant={isSmall ? "h6" : "h5"}
                    sx={{ fontWeight: 700 }}
                  >
                    {user.name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    <Chip
                      size="small"
                      label={user.role}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      color="success"
                      label={user.status}
                      icon={<CheckCircleOutlineOutlinedIcon />}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ color: "text.secondary", mt: 0.5 }}
                  >
                    <EmailOutlinedIcon fontSize="small" />
                    <Typography variant="body2" noWrap>
                      {user.email}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ color: "text.secondary" }}
                  >
                    <PhoneIphoneOutlinedIcon fontSize="small" />
                    <Typography variant="body2" noWrap>
                      {user.phone}
                    </Typography>
                  </Stack>

                  <Box sx={{ mt: 1.5 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={0.5}
                    >
                      <StorageOutlinedIcon fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        Storage usage
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={user.storagePct}
                      sx={{
                        my: 0.5,
                        height: 6,
                        borderRadius: 999,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {user.used} / {user.quota}
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction={isSmall ? "row" : "column"}
                  spacing={1}
                  alignItems={isSmall ? "center" : "flex-end"}
                >
                  <Button
                    variant="contained"
                    startIcon={<EditOutlinedIcon />}
                    onClick={openEdit}
                    sx={{ borderRadius: 2, minWidth: 130 }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ borderRadius: 2, minWidth: 130 }}
                  >
                    Logout
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 3,
            }}
            elevation={3}
          >
            <CardContent>
              <Stack spacing={3}>
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Account
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last login: {relativeLastLogin}
                    </Typography>
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="overline" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1">{user.name}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="overline" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">{user.email}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="overline" color="text.secondary">
                        Role
                      </Typography>
                      <Typography variant="body1">{user.role}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="overline" color="text.secondary">
                        Current time
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeOutlinedIcon fontSize="small" />
                        <Typography variant="body1">
                          {new Date(now).toLocaleTimeString()}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Preferences
                      </Typography>
                      <Stack spacing={0.5}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={prefs.emailNotifs}
                              onChange={(_, v) => {
                                setPrefs((p) => ({
                                  ...p,
                                  emailNotifs: v,
                                }));
                                notify(
                                  v
                                    ? "Email notifications enabled"
                                    : "Email notifications disabled"
                                );
                              }}
                            />
                          }
                          label="Email notifications"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={prefs.twoFA}
                              onChange={(_, v) => {
                                setPrefs((p) => ({ ...p, twoFA: v }));
                                notify(
                                  v
                                    ? "Two-factor authentication ON"
                                    : "Two-factor authentication OFF"
                                );
                              }}
                            />
                          }
                          label="Two-factor authentication"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={prefs.autoSave}
                              onChange={(_, v) => {
                                setPrefs((p) => ({
                                  ...p,
                                  autoSave: v,
                                }));
                                notify(
                                  v ? "Auto-save enabled" : "Auto-save disabled"
                                );
                              }}
                            />
                          }
                          label="Auto-save drafts"
                        />
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Recent Activity
                      </Typography>
                      <List dense>
                        <ListItem disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutlineOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Updated profile information"
                            secondary="2 hours ago"
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <SecurityOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Enabled 2FA"
                            secondary="Yesterday"
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <PersonOutlineIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Joined project ‘Atlas’"
                            secondary="3 days ago"
                          />
                        </ListItem>
                      </List>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Avatar URL"
              value={form.avatar}
              onChange={(e) =>
                setForm((f) => ({ ...f, avatar: e.target.value }))
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={1800}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snack.sev}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
