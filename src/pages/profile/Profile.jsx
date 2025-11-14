import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
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
} from "@mui/material";

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
  // ========= 1) بيانات المستخدم (قابلة للتعديل) =========

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

      // ندمج عشان لو فيه بيانات ناقصة/قديمة
      return { ...defaultUser, ...parsed };
    } catch (e) {
      console.warn("Failed to parse profile_user from localStorage:", e);
      return defaultUser;
    }
  });

  useEffect(() => {
    localStorage.setItem("profile_user", JSON.stringify(user));
  }, [user]);

  // ========= 2) تفضيلات (سويتشات) مع حفظ =========
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

  // ========= 3) وقت آخر دخول + ساعة حية =========
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

  // ========= 4) Dialog تعديل الملف =========
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

  // ========= 5) Snackbar للتأكيدات =========
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    sev: "success",
  });

  const notify = (msg, sev = "success") =>
    setSnack({ open: true, msg, sev });
  const closeSnack = () => setSnack((prev) => ({ ...prev, open: false }));

  const saveEdit = () => {
    setUser((u) => ({ ...u, ...form }));
    setEditOpen(false);
    notify("Profile updated");
  };

  // ========= 6) Toggle Theme مضمون =========
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

  // ========= 7) Logout (بسيط + hook اختياري) =========
  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    } else {
      localStorage.removeItem("auth_token");
      notify("Logged out");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Grid container spacing={3}>
        {/* العمود الأيسر: بطاقة المستخدم */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, overflow: "hidden" }} elevation={8}>
            <Box
              sx={{
                height: 120,
                background:
                  "linear-gradient(135deg, rgba(99,102,241,.25), rgba(56,189,248,.25))",
              }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Stack alignItems="center" sx={{ mt: -7 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 112,
                    height: 112,
                    border: "3px solid rgba(255,255,255,.9)",
                    boxShadow: 3,
                  }}
                >
                  {(user.name?.[0] || "U").toUpperCase()}
                </Avatar>

                <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                  {user.name}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip size="small" label={user.role} />
                  <Chip size="small" color="success" label={user.status} />
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  <EmailOutlinedIcon fontSize="small" />
                  <Typography variant="body2">{user.email}</Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 0.5, color: "text.secondary" }}
                >
                  <PhoneIphoneOutlinedIcon fontSize="small" />
                  <Typography variant="body2">{user.phone}</Typography>
                </Stack>
              </Stack>

              {/* التخزين */}
              <Box sx={{ mt: 3 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={0.5}
                >
                  <StorageOutlinedIcon fontSize="small" />
                  <Typography variant="caption" color="text.secondary">
                    Storage
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={user.storagePct}
                  sx={{ my: 0.75, height: 8, borderRadius: 2 }}
                />
                <Typography variant="caption">
                  {user.used} / {user.quota}
                </Typography>
              </Box>
            </CardContent>

            <CardActions
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                justifyContent: "space-between",
                borderTop: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <Button
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                onClick={openEdit}
              >
                Edit Profile
              </Button>
              <IconButton color="error" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        {/* العمود الأيمن: تفاصيل + تفضيلات + نشاط */}
        <Grid item xs={12} md={8}>
          {/* معلومات الحساب */}
          <Card sx={{ borderRadius: 3 }} elevation={4}>
            <CardHeader
              title="Account Info"
              subheader={`Last login: ${relativeLastLogin}`}
              action={
                <IconButton onClick={handleToggleTheme} title="Toggle Theme">
                  <Brightness4OutlinedIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="overline" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">{user.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="overline" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="overline" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1">{user.role}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="overline" color="text.secondary">
                    Exact time
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeOutlinedIcon fontSize="small" />
                    <Typography variant="body1">
                      {new Date(now).toLocaleTimeString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* تفضيلات + نشاط */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3 }} elevation={4}>
                <CardHeader
                  title="Preferences"
                  subheader="Personalize your experience"
                />
                <Divider />
                <CardContent>
                  <Stack spacing={1}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={prefs.emailNotifs}
                          onChange={(_, v) => {
                            setPrefs((p) => ({ ...p, emailNotifs: v }));
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
                            setPrefs((p) => ({ ...p, autoSave: v }));
                            notify(
                              v
                                ? "Auto-save enabled"
                                : "Auto-save disabled"
                            );
                          }}
                        />
                      }
                      label="Auto-save drafts"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3 }} elevation={4}>
                <CardHeader title="Recent Activity" />
                <Divider />
                <CardContent sx={{ pt: 0 }}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutlineOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Updated profile information"
                        secondary="2 hours ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SecurityOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Enabled 2FA"
                        secondary="Yesterday"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Joined project ‘Atlas’"
                        secondary="3 days ago"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog تعديل البيانات */}
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

      {/* Snackbar */}
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
    </Container>
  );
}
