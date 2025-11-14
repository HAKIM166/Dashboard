import React from "react";
import {
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Download as DownloadIcon } from "@mui/icons-material";
import { rows, columns } from "./data";

export default function Contacts() {
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

  //CSV
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

  return (
    <Box sx={{ maxWidth: "98%", mx: "auto" }}>
  {/* Toolbar*/}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      p: 1,
      mb: 1,
      bgcolor: "background.paper",
      borderBottom: "1px solid",
      borderColor: "divider",
      borderRadius: 1,
      position: "sticky",
      top: 0,
      zIndex: 2,
    }}
  >
    <TextField
      size="small"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{ minWidth: 220 }}
    />

    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
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
        sx={{ textTransform: "capitalize", fontWeight: 600, px: 2, py: 0.6, borderRadius: "0.5em" }}
      >
        Export CSV
      </Button>
    </Box>
  </Box>


  <Box sx={{ height: { xs: 420, sm: 520, md: 600 }, overflow: "hidden", borderRadius: 1 }}>
    <DataGrid
      rows={rows}
      columns={columns}
      density={density}
      filterModel={filterModel}
      onFilterModelChange={setFilterModel}
      disableColumnMenu
      sx={{ height: 1 }}
    />
  </Box>
</Box>

  );
}
