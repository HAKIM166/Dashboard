/**
 * Contacts Page
 * -------------
 * Tabular view of contact data with responsive layout, quick filtering,
 * adjustable row density, and CSV export functionality.
 */

import React from "react";
import {
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Download as DownloadIcon } from "@mui/icons-material";
import { rows, columns } from "./data";
import Header from "../../components/Header";

export default function Contacts() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleExport = () => {
    const csvRows = [];
    const headers = columns.map((col) => col.headerName);
    csvRows.push(headers.join(","));
    rows.forEach((row) => {
      const values = columns.map((col) => row[col.field]);
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

  const displayedColumns = React.useMemo(() => {
    if (!isXs) return columns;

    const importantFields = ["id", "name", "email", "phone", "age"];
    const lowered = importantFields.map((f) => f.toLowerCase());

    const filtered = columns.filter((col) =>
      lowered.includes(String(col.field).toLowerCase())
    );

    return filtered.length ? filtered : columns.slice(0, 4);
  }, [isXs]);

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
        subTitle={"View and manage your key contacts details"}
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
      <Box
        sx={{
          borderRadius: 1,
        }}
      >
        <DataGrid
          rows={rows}
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
    </Box>
  );
}
