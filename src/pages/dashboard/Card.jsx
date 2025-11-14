import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import React from "react";

export default function Card({ icon, title, subTitle, increase, data ,scheme}) {
  const mui = useTheme();
  const lineColor = mui.palette.divider;
  const textPrimary = mui.palette.text.primary;
  return (
    <Paper
      sx={{
        flexGrow: 1,
        minWidth: "333px",
        p: 1.5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Stack gap={1}>
        {icon}
        <Typography variant="body2" sx={{ fontSize: "13px" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "13px" }}>
          {subTitle}
        </Typography>
      </Stack>
      <Stack alignItems={"center"}>
        <Box height={"70px"} width={"80px"}>
          <ResponsivePie /* or Pie for fixed dimensions */
            data={data}
            theme={{
              background: "transparent",


              tooltip: {
                container: {
                  background: mui.palette.background.paper,
                  color: textPrimary,
                  border: `1px solid ${lineColor}`,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                },
              },
            }}
            margin={{ top: 0, right: 0, bottom: 10, left: 0 }}
            innerRadius={0.7}
            colors={{ scheme: scheme }}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            padAngle={0.6}
            cornerRadius={2}
            activeOuterRadiusOffset={8}
          />
        </Box>
        <Typography variant="body2">{increase}</Typography>
      </Stack>
    </Paper>
  );
}
