/**
 * Invoices Page
 * -------------
 * Responsive invoices table with mobile-optimized column sizing,
 * quick search, adjustable row density, and CSV export.
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
import { columns, rows } from "./data";
import Header from "../../components/Header";

export default function Invoices() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setQuery] = React.useState("");
  const [density, setDensity] = React.useState("standard");
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterValues: [],
  });

  // Sync search box with DataGrid quick filter
  React.useEffect(() => {
    setFilterModel((prev) => ({
      ...prev,
      quickFilterValues: query ? [query] : [],
    }));
  }, [query]);

  // Responsive columns for mobile
  const responsiveColumns = React.useMemo(() => {
    if (!isXs) return columns;

    return columns.map((col) => ({
      ...col,
      flex: col.flex || 1,
      minWidth: 70,
      headerAlign: "center",
      align: "center",
    }));
  }, [isXs]);

  // Export current table to CSV
  const handleExport = () => {
    const csvRows = [];
    const exportColumns = responsiveColumns;

    const headers = exportColumns.map((col) => col.headerName || col.field);
    csvRows.push(headers.join(","));

    (rows || []).forEach((row) => {
      const values = exportColumns.map((col) => row[col.field] ?? "");
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "InvoicesData.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "98%", md: "98%" },
        mx: "auto",
      }}
    >
      <Header
        title={"INVOICES BALANCES"}
        subTitle={"Track your invoices and outstanding balances"}
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
          placeholder="Search invoices..."
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
      <DataGrid
        checkboxSelection
        rows={rows || []}
        columns={responsiveColumns}
        density={density}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        autoHeight
        hideFooter={isXs}
        disableColumnMenu
        sx={{
          "& .MuiDataGrid-cell": {
            padding: { xs: "3px 4px", sm: "6px 10px" },
            fontSize: { xs: "0.70rem", sm: "0.85rem" },
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            whiteSpace: "nowrap",
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "hidden",
          },
        }}
      />
    </Box>
  );
}
