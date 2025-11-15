/**
 * Contacts Page
 * -------------
 * Tabular view of contact data with responsive layout, quick filtering,
 * adjustable row density, CSV export, and local editing (add/edit/delete)
 * with basic role-based permissions.
 */

import React from "react";
import {
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  Download as DownloadIcon,
  EditOutlined,
  DeleteOutline,
  Add as AddIcon,
} from "@mui/icons-material";
import { rows as initialRows, columns as baseColumns } from "./data";
import Header from "../../components/Header";

// Logical shape for the edit dialog
const EMPTY_CONTACT = {
  id: "",
  registrarId: "",
  name: "",
  age: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  zipCode: "",
};

// ---- helpers to map between dialog state and grid row ----

// Read values from a grid row into dialog state (handles different casings)
const mapRowToEditing = (row) => ({
  id: row.id,
  registrarId: row.registrarId || row.RegistrarID || "",
  name: row.name || row.Name || "",
  age: row.age || row.Age || "",
  phone: row.phone || row.Phone || "",
  email: row.email || row.Email || "",
  address: row.address || row.Address || "",
  city: row.city || row.City || "",
  zipCode: row.zipCode || row.ZipCode || "",
});

export default function Contacts() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // Permission: only Admin / Manager can modify contacts
  const [canEdit, setCanEdit] = React.useState(false);

  React.useEffect(() => {
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

  // Contacts rows state (load from localStorage or use initial rows)
  const [contactRows, setContactRows] = React.useState(() => {
    try {
      const saved = localStorage.getItem("contacts_rows");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse contacts_rows:", e);
    }
    return initialRows;
  });

  // Persist contacts whenever they change
  React.useEffect(() => {
    localStorage.setItem("contacts_rows", JSON.stringify(contactRows));
  }, [contactRows]);

  const [query, setQuery] = React.useState("");
  const [density, setDensity] = React.useState("standard");
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterValues: [],
  });

  React.useEffect(() => {
    setFilterModel((prev) => ({
      ...prev,
      quickFilterValues: query ? [query] : [],
    }));
  }, [query]);

  // Dialog state for add/edit contact
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState("add"); // "add" | "edit"
  const [editingRow, setEditingRow] = React.useState(EMPTY_CONTACT);

  // Build a new grid row object from dialog state, using baseColumns fields
  const mapEditingToRow = () => {
    const row = {};
    baseColumns.forEach((col) => {
      const f = col.field;

      switch (f) {
        case "id":
          row[f] = Number(editingRow.id);
          break;

        case "registrarId":
        case "RegistrarID":
          row[f] = editingRow.registrarId;
          break;

        case "name":
        case "Name":
          row[f] = editingRow.name;
          break;

        case "age":
        case "Age":
          row[f] = editingRow.age ? Number(editingRow.age) : "";
          break;

        case "phone":
        case "Phone":
          row[f] = editingRow.phone;
          break;

        case "email":
        case "Email":
          row[f] = editingRow.email;
          break;

        case "address":
        case "Address":
          row[f] = editingRow.address;
          break;

        case "city":
        case "City":
          row[f] = editingRow.city;
          break;

        case "zipCode":
        case "ZipCode":
          row[f] = editingRow.zipCode;
          break;

        default:
          // For any extra column, keep previous value or leave empty
          row[f] = editingRow[f] ?? "";
      }
    });

    return row;
  };

  // ---- dialog handlers ----

  const handleAddClick = () => {
    if (!canEdit) return;

    const nextId =
      contactRows && contactRows.length > 0
        ? Math.max(
            ...contactRows.map((r) => {
              const n = Number(r.id);
              return Number.isNaN(n) ? 0 : n;
            })
          ) + 1
        : 1;

    setDialogMode("add");
    setEditingRow({
      ...EMPTY_CONTACT,
      id: nextId,
    });
    setDialogOpen(true);
  };

  const handleEditClick = React.useCallback(
    (row) => {
      if (!canEdit) return;
      setDialogMode("edit");
      setEditingRow(mapRowToEditing(row));
      setDialogOpen(true);
    },
    [canEdit]
  );

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFieldChange = (field) => (event) => {
    setEditingRow((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveContact = () => {
    // Basic validation
    if (!editingRow.name || !editingRow.email) {
      alert("Name and email are required.");
      return;
    }

    const newRow = mapEditingToRow();

    if (dialogMode === "add") {
      setContactRows((prev) => [...prev, newRow]);
    } else {
      setContactRows((prev) =>
        prev.map((row) => (row.id === newRow.id ? newRow : row))
      );
    }

    setDialogOpen(false);
  };

  const handleDeleteClick = React.useCallback(
    (id) => {
      if (!canEdit) return;
      const confirmed = window.confirm(
        "Are you sure you want to delete this contact?"
      );
      if (!confirmed) return;

      setContactRows((prev) => prev.filter((row) => row.id !== id));
    },
    [canEdit]
  );

  // ---- columns (add Actions column without mutating baseColumns) ----

  const columnsWithActions = React.useMemo(() => {
    const hasActions = baseColumns.some((col) => col.field === "actions");
    if (hasActions) return baseColumns;

    const actionsColumn = {
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
    };

    return [...baseColumns, actionsColumn];
  }, [canEdit, isXs, handleEditClick, handleDeleteClick]);

  // Columns displayed based on viewport size (for responsiveness)
  const displayedColumns = React.useMemo(() => {
    if (!isXs) return columnsWithActions;

    const importantFields = [
      "id",
      "registrarId",
      "RegistrarID",
      "name",
      "Name",
      "email",
      "Email",
      "phone",
      "Phone",
      "age",
      "Age",
      "actions",
    ];
    const lowered = importantFields.map((f) => f.toLowerCase());

    const filtered = columnsWithActions.filter((col) =>
      lowered.includes(String(col.field).toLowerCase())
    );

    return filtered.length ? filtered : columnsWithActions.slice(0, 6);
  }, [isXs, columnsWithActions]);

  // ---- CSV export ----

  const handleExport = () => {
    const csvRows = [];

    // Exclude "actions" column from export
    const exportColumns = columnsWithActions.filter(
      (col) => col.field !== "actions"
    );

    const headers = exportColumns.map((col) => col.headerName || col.field);
    csvRows.push(headers.join(","));

    (contactRows || []).forEach((row) => {
      const values = exportColumns.map((col) => row[col.field] ?? "");
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ContactsData.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ---- render ----

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "95%", md: "100%" },
        mx: "auto",
      }}
    >
      <Header
        title={"CONTACTS INFORMATION"}
        subTitle={
          canEdit
            ? "View, add, and manage your key contacts details"
            : "View your key contacts details"
        }
      />

      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: 1,
          mb: 1.5,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          position: { xs: "static", sm: "sticky" },
          top: 0,
          zIndex: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          size="small"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ minWidth: { xs: "auto", sm: 220 }, flex: { xs: 1, sm: 0 } }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <ToggleButtonGroup
            value={density}
            exclusive
            onChange={(_, v) => v && setDensity(v)}
            size="small"
          >
            <ToggleButton value="compact">Compact</ToggleButton>
            <ToggleButton value="standard">Standard</ToggleButton>
            <ToggleButton value="comfortable">Comfort</ToggleButton>
          </ToggleButtonGroup>

          {canEdit && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                px: 2,
                py: 0.6,
                borderRadius: "0.5em",
              }}
            >
              Add Contact
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              px: 2,
              py: 0.6,
              borderRadius: "0.5em",
            }}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* DataGrid */}
      <Box sx={{ borderRadius: 1 }}>
        <DataGrid
          rows={contactRows || []}
          columns={displayedColumns}
          density={density}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          disableColumnMenu
          autoHeight
          hideFooter={isXs}
          sx={{
            "& .MuiDataGrid-cell": {
              padding: { xs: "4px 6px", sm: "6px 10px" },
              fontSize: { xs: "0.7rem", sm: "0.85rem" },
              lineHeight: 1.2,
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: { xs: "0.75rem", sm: "0.9rem" },
            },
            "& .MuiDataGrid-virtualScroller": {
              overflowX: "hidden",
            },
          }}
        />
      </Box>

      {/* Add / Edit Contact Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add Contact" : "Edit Contact"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Registrar ID"
                value={editingRow.registrarId}
                onChange={handleFieldChange("registrarId")}
                fullWidth
              />
              <TextField
                label="Zip Code"
                value={editingRow.zipCode}
                onChange={handleFieldChange("zipCode")}
                fullWidth
              />
            </Stack>

            <TextField
              label="Name"
              value={editingRow.name}
              onChange={handleFieldChange("name")}
              fullWidth
            />
            <TextField
              label="Email"
              value={editingRow.email}
              onChange={handleFieldChange("email")}
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Phone"
                value={editingRow.phone}
                onChange={handleFieldChange("phone")}
                fullWidth
              />
              <TextField
                label="Age"
                type="number"
                value={editingRow.age}
                onChange={handleFieldChange("age")}
                fullWidth
              />
            </Stack>

            <TextField
              label="Address"
              value={editingRow.address}
              onChange={handleFieldChange("address")}
              fullWidth
            />
            <TextField
              label="City"
              value={editingRow.city}
              onChange={handleFieldChange("city")}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveContact}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
