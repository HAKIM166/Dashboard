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
          width: { xs: "100%", md: "28%" },
          borderRadius: 1,
          minWidth: 400,
          flexGrow: 1,
        }}
      >
        <Typography
          color={isDark ? Theme.palette.warning.light : Theme.palette.info.main}
          sx={{ p: "30px 30px 0 30px" }}
          variant="h6"
          fontWeight={600}
        >
          Campaign
        </Typography>

        <Pie isDashboard={true} />

        <Typography
          variant="h6"
          sx={{ p: "0 30px 20px 30px", textAlign: "center" }}
        >
          $48,434 revenue generated
        </Typography>

        <Typography
          variant="body2"
          sx={{
            p: "0 30px 30px 30px",
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
          minWidth: 400,
          flexGrow: 1,
        }}
      >
        <Typography
          color={isDark ? Theme.palette.warning.light : Theme.palette.info.main}
          sx={{ p: "30px 30px 0 30px" }}
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
          minWidth: 400,
          flexGrow: 1,
        }}
      >
        <Geo isDashboard={true} />
      </Paper>
    </Stack>
  );
}
