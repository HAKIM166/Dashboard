/**
 * Invoices Page
 * -------------
 * Responsive invoices table with mobile-optimized column sizing,
 * checkbox selection, and automatic height based on content.
 */

import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "./data";
import Header from "../../components/Header";

export default function Invoices() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

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
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={responsiveColumns}
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
