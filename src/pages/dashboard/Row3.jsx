/**
 * Dashboard Row 3
 * ----------------
 * Final dashboard row combining campaign performance, sales quantity,
 * and geographic distribution charts in a responsive layout.
 */

import { Paper, Stack, Typography, useTheme } from "@mui/material";
import Pie from "../../pages/pieChart/Pie";
import React from "react";
import Bar from "../../pages/barChart/Bar";
import Geo from "../../pages/geography/geo";

export default function Row3() {
  const Theme = useTheme();
  const isDark = Theme.palette.mode === "dark";

  return (
    <Stack direction="row" flexWrap="wrap" mt={2} gap={1.5}>
      <Paper
        sx={{
          width: { xs: "100%", md: "32%" },
          borderRadius: 1,
          flexGrow: 1,
          minWidth: { xs: "100%", sm: 260, md: 320 },
        }}
      >
        <Typography
          color={isDark ? Theme.palette.warning.light : Theme.palette.info.main}
          sx={{ p: "18px 18px 0 18px" }}
          variant="h6"
          fontWeight={600}
        >
          Campaign
        </Typography>

        <Pie isDashboard={true} />

        <Typography
          variant="h6"
          sx={{ p: "0 18px 10px 18px", textAlign: "center" }}
        >
          $48,434 revenue generated
        </Typography>

        <Typography
          variant="body2"
          sx={{
            p: "0 18px 18px 18px",
            textAlign: "center",
            color: Theme.palette.text.secondary,
          }}
        >
          Includes extra misc expenditures and costs
        </Typography>
      </Paper>

      <Paper
        sx={{
          width: { xs: "100%", md: "33%" },
          flexGrow: 1,
          minWidth: { xs: "100%", sm: 260, md: 340 },
        }}
      >
        <Typography
          color={isDark ? Theme.palette.warning.light : Theme.palette.info.main}
          sx={{ p: "18px 18px 0 18px" }}
          variant="h6"
          fontWeight={600}
        >
          Sales Quantity
        </Typography>

        <Bar isDashboard={true} />
      </Paper>

      <Paper
        sx={{
          width: { xs: "100%", md: "33%" },
          flexGrow: 1,
          minWidth: { xs: "100%", sm: 260, md: 340 },
        }}
      >
        <Geo isDashboard={true} />
      </Paper>
    </Stack>
  );
}
