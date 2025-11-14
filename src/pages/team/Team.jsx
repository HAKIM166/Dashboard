import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./data";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

export default function Team() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.35,
      minWidth: 40,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      minWidth: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
      minWidth: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.5,
      minWidth: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Access",
      headerName: "Access",
      flex: 0.7,
      minWidth: 90,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        const access = row.Access;
        const bg =
          access === "Admin"
            ? theme.palette.success.main
            : access === "Manager"
            ? theme.palette.info.main
            : theme.palette.primary.main;
        const fg = theme.palette.getContrastText(bg);
        return (
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25em",
              fontSize: isXs ? "0.62rem" : "0.75rem",
              px: isXs ? "0.45em" : "0.6em",
              py: isXs ? "0.18em" : "0.25em",
              mt: 1.5,
              borderRadius: "0.35em",
              bgcolor: bg,
              color: fg,
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            {access === "Admin" && (
              <AdminPanelSettingsOutlined fontSize="small" />
            )}
            {access === "Manager" && <SecurityOutlined fontSize="small" />}
            {access === "User" && <LockOpenOutlined fontSize="small" />}
            <Typography
              component="span"
              fontWeight={600}
              sx={{ lineHeight: 1, fontSize: "1.5em" }}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: "98%",
        mx: "auto",
        height: { xs: 520, sm: 560, md: 600 },
      }}
    >
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
