import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Typography,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

// الأيقونات
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { alpha } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: { width: `calc(${theme.spacing(8)} + 1px)` },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? { ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme) }
    : { ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme) }),
}));

// Placeholder داخلي (SVG inline بدون أي طلبات شبكة)
const INLINE_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#fdfbfb'/>
        <stop offset='100%' stop-color='#ebedee'/>
      </linearGradient>
    </defs>
    <circle cx='75' cy='75' r='70' fill='url(#g)' stroke='#bfc5ca' stroke-width='1.5'/>
    <text x='50%' y='56%' text-anchor='middle' font-size='50' fill='#7b8a98' dy='.3em'>👤</text>
  </svg>
`);

// قراءة مبدئية آمنة من localStorage (مرة واحدة)
function readUserFromLS() {
  try {
    const p = JSON.parse(localStorage.getItem("profile_user") || "{}");
    return {
      name: p?.name || "Unknown User",
      role: p?.role || "Member",
      avatar: p?.avatar || "",
    };
  } catch {
    return { name: "Unknown User", role: "Member", avatar: "" };
  }
}

export default function SideBar({ open, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // حالة واحدة للـuser تُقرأ مرة واحدة
  const [user, setUser] = useState(() => readUserFromLS());
  // الصورة تتحدد من user فورًا + placeholder داخلي
  const [avatarSrc, setAvatarSrc] = useState(
    () => user.avatar || INLINE_PLACEHOLDER
  );

  // استماع لتحديثات البيانات (بين التبويبات أو من صفحة البروفايل)
  useEffect(() => {
    const handleStorage = () => {
      const next = readUserFromLS();
      setUser(next);
      setAvatarSrc(next.avatar || INLINE_PLACEHOLDER);
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("profile_user_updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("profile_user_updated", handleStorage);
    };
  }, []);

  // القوائم
  const Array1 = [
    { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/" },
    { text: "Manage Team", icon: <PeopleOutlinedIcon />, path: "/team" },
    { text: "Contacts Information", icon: <ContactsOutlinedIcon />, path: "/contacts" },
    { text: "Invoices Balances", icon: <ReceiptOutlinedIcon />, path: "/invoices" },
  ];
  const Array2 = [
    { text: "Profile Form", icon: <PersonOutlinedIcon />, path: "/form" },
    { text: "Calendar", icon: <CalendarTodayOutlinedIcon />, path: "/calendar" },
    { text: "FAQ Page", icon: <HelpOutlineOutlinedIcon />, path: "/faq" },
  ];
  const Array3 = [
    { text: "Bar Chart", icon: <BarChartOutlinedIcon />, path: "/bar" },
    { text: "Pie Chart", icon: <PieChartOutlinedIcon />, path: "/pie" },
    { text: "Line Chart", icon: <TimelineOutlinedIcon />, path: "/line" },
    { text: "Geography Chart", icon: <MapOutlinedIcon />, path: "/geography" },
  ];

  // بسّطت المنطق شوية
  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  const renderMenu = (items) =>
    items.map((item) => {
      const active = isActive(item.path);
      return (
        <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => navigate(item.path)}
            selected={active}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(active && {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                backdropFilter: "blur(6px)",
                "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                  color: theme.palette.primary.light,
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      );
    });

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} aria-label="close sidebar">
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      {/* صورة واسم/دور المستخدم (ديناميكيين) */}
      <Avatar
        sx={{
          mx: "auto",
          width: open ? 88 : 44,
          height: open ? 88 : 44,
          my: 1,
          border: "2px solid gray",
          transition: "0.25s",
          cursor: "pointer",
          "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
        }}
        alt={user.name}
        src={avatarSrc}
        imgProps={{
          // eager لأن الأفاتار فوق-fold غالبًا؛ لو عايز lazy ارجعه
          loading: "eager",
          onError: () => setAvatarSrc(INLINE_PLACEHOLDER),
        }}
        onClick={() => navigate("/profile")}
      />

      <Typography align="center" sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}>
        {user.name}
      </Typography>

      <Typography
        align="center"
        sx={{
          fontSize: open ? 15 : 0,
          transition: "0.25s",
          color: theme.palette.info.main,
        }}
      >
        {user.role}
      </Typography>

      <Divider />
      <List>{renderMenu(Array1)}</List>
      <Divider />
      <List>{renderMenu(Array2)}</List>
      <Divider />
      <List>{renderMenu(Array3)}</List>
    </Drawer>
  );
}
