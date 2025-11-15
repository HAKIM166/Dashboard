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
import Header from "../../components/Header";

export default function Team() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // All columns (desktop & larger screens)
  const allColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
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
      minWidth: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.4,
      minWidth: 60,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 120,
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
              gap: "0.45em",
              fontSize: isXs ? "0.70rem" : "0.85rem",
              px: isXs ? "0.65em" : "0.85em",
              py: isXs ? "0.35em" : "0.42em",
              mt: 1,
              borderRadius: "4px",
              bgcolor: bg,
              color: fg,
              whiteSpace: "nowrap",
              lineHeight: 1,
              fontWeight: 600,
            }}
          >
            {access === "Admin" && (
              <AdminPanelSettingsOutlined sx={{ fontSize: "1.3em" }} />
            )}
            {access === "Manager" && (
              <SecurityOutlined sx={{ fontSize: "1.3em" }} />
            )}
            {access === "User" && (
              <LockOpenOutlined sx={{ fontSize: "1.3em" }} />
            )}

            <Typography
              component="span"
              sx={{
                lineHeight: 1,
                fontSize: "1em",
                fontWeight: 600,
              }}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // Mobile-only columns (remove Email & Phone to avoid horizontal scroll)
  const mobileColumns = [
    allColumns[0], // ID
    allColumns[1], // Name
    allColumns[3], // Age
    allColumns[5], // Access
  ];

  const columns = isXs ? mobileColumns : allColumns;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "89%", md: "98%", lg: "100%", xl: "100%" },
        mx: "auto",
      }}
    >
      <Header
        title={"MANAGE TEAM"}
        subTitle={"Add, edit, and manage your team members"}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        hideFooter={isXs}
        disableColumnMenu
        sx={{
          "& .MuiDataGrid-cell": {
            padding: { xs: "4px 6px", sm: "6px 10px" },
            fontSize: { xs: "0.70rem", sm: "0.85rem" },
            lineHeight: 1.2,
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: { xs: "0.75rem", sm: "0.90rem" },
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "hidden", // ensure no horizontal scroll
          },
        }}
      />
    </Box>
  );
}
