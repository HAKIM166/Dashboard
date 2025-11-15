import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows as initialRows } from "./data";
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
  EditOutlined,
  DeleteOutline,
  Add as AddIcon,
} from "@mui/icons-material";
import Header from "../../components/Header";

export default function Team() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // Permission: only Admin / Manager can edit
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile_user");
      if (!saved) return;
      const user = JSON.parse(saved);
      const role = (user.role || "").toLowerCase();
      if (role === "admin" || role === "manager") {
        setCanEdit(true);
      }
    } catch (e) {
      console.warn("Failed to read profile_user:", e);
    }
  }, []);

  // Team rows state (loaded from localStorage or initial data)
  const [teamRows, setTeamRows] = useState(() => {
    try {
      const saved = localStorage.getItem("team_rows");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse team_rows:", e);
    }
    return initialRows;
  });

  // Persist rows whenever they change
  useEffect(() => {
    localStorage.setItem("team_rows", JSON.stringify(teamRows));
  }, [teamRows]);

  // Dialog state (add / edit)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" | "edit"
  const [editingRow, setEditingRow] = useState({
    id: "",
    Name: "",
    Email: "",
    age: "",
    Phone: "",
    Access: "User",
  });

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "User", label: "User" },
  ];

  // Open dialog in "add" mode
  const handleAddClick = () => {
    if (!canEdit) return;
    const nextId =
      teamRows.length > 0
        ? Math.max(...teamRows.map((r) => Number(r.id) || 0)) + 1
        : 1;

    setDialogMode("add");
    setEditingRow({
      id: nextId,
      Name: "",
      Email: "",
      age: "",
      Phone: "",
      Access: "User",
    });
    setDialogOpen(true);
  };

  // Open dialog in "edit" mode
  const handleEditClick = (row) => {
    if (!canEdit) return;
    setDialogMode("edit");
    setEditingRow({ ...row });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Handle form input change in dialog
  const handleFieldChange = (field) => (event) => {
    setEditingRow((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Save changes (add or edit)
  const handleSaveMember = () => {
    // Basic validation (you can extend if needed)
    if (!editingRow.Name || !editingRow.Email) {
      alert("Name and Email are required.");
      return;
    }

    if (dialogMode === "add") {
      setTeamRows((prev) => [...prev, editingRow]);
    } else {
      setTeamRows((prev) =>
        prev.map((row) => (row.id === editingRow.id ? editingRow : row))
      );
    }

    setDialogOpen(false);
  };

  // Delete member
  const handleDeleteClick = (id) => {
    if (!canEdit) return;
    const confirmed = window.confirm("Are you sure you want to remove this member?");
    if (!confirmed) return;

    setTeamRows((prev) => prev.filter((row) => row.id !== id));
  };

  // All columns for desktop / large screens
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
      flex: 1.4,
      minWidth: 160,
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
      minWidth: 130,
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      minWidth: 110,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            justifyContent: "center",
          }}
        >
          <IconButton
            size={isXs ? "small" : "medium"}
            onClick={() => handleEditClick(row)}
            disabled={!canEdit}
          >
            <EditOutlined fontSize={isXs ? "small" : "medium"} />
          </IconButton>
          <IconButton
            size={isXs ? "small" : "medium"}
            onClick={() => handleDeleteClick(row.id)}
            disabled={!canEdit}
          >
            <DeleteOutline fontSize={isXs ? "small" : "medium"} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Mobile columns (reduced)
  const mobileColumns = [
    allColumns[0], // ID
    allColumns[1], // Name
    allColumns[5], // Access badge
    allColumns[6], // Actions
  ];

  const columns = isXs ? mobileColumns : allColumns;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "95%", md: "98%", lg: "100%", xl: "100%" },
        mx: "auto",
      }}
    >
      <Header
        title={"MANAGE TEAM"}
        subTitle={
          canEdit
            ? "Add, edit, and manage your team members"
            : "View team members (read-only)"
        }
      />

      {/* Top bar with Add button */}
      <Box
        sx={{
          mb: 1.5,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {canEdit && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            sx={{
              textTransform: "none",
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              px: { xs: 1.5, sm: 2.5 },
              py: { xs: 0.5, sm: 0.7 },
            }}
          >
            Add Member
          </Button>
        )}
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={teamRows}
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
            overflowX: "hidden",
          },
        }}
      />

      {/* Add / Edit Member Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add Team Member" : "Edit Team Member"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={editingRow.Name}
              onChange={handleFieldChange("Name")}
              fullWidth
            />
            <TextField
              label="Email"
              value={editingRow.Email}
              onChange={handleFieldChange("Email")}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Age"
                type="number"
                value={editingRow.age}
                onChange={handleFieldChange("age")}
                fullWidth
              />
              <TextField
                label="Phone"
                value={editingRow.Phone}
                onChange={handleFieldChange("Phone")}
                fullWidth
              />
            </Stack>
            <TextField
              select
              label="Access Level"
              value={editingRow.Access}
              onChange={handleFieldChange("Access")}
              fullWidth
            >
              {roleOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveMember}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
