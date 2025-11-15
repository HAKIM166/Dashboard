/**
 * Dashboard Page
 * ---------------
 * Main analytics overview screen composed of three content rows
 * and a quick action to download summary reports.
 */

import React from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import Header from "../../components/Header";

export default function Dashboard() {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Header
          isDashboard={true}
          title={"DASHBOARD"}
          subTitle={"Welcome to your dashboard"}
        />
        <Box sx={{ textAlign: "right", mb: "20px" }}>
          <Button
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: 0.7,
              padding: "7px 8px",
              fontSize: "0.95rem",
              "@media (max-width:600px)": {
                padding: "4px 8px",
                fontSize: "0.75rem",
                minWidth: "auto",
                "& svg": { fontSize: "18px" },
              },
            }}
            variant="contained"
          >
            <DownloadOutlined />
            Download Reports
          </Button>
        </Box>
      </Stack>

      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}
