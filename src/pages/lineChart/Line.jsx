import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const data = [
  {
    id: "japan",
    data: [
      { x: "plane", y: 142 },
      { x: "helicopter", y: 136 },
      { x: "boat", y: 173 },
      { x: "train", y: 102 },
      { x: "subway", y: 141 },
      { x: "bus", y: 105 },
      { x: "car", y: 275 },
      { x: "moto", y: 151 },
      { x: "bicycle", y: 38 },
      { x: "horse", y: 4 },
      { x: "skateboard", y: 265 },
      { x: "others", y: 103 },
    ],
  },
  {
    id: "france",
    data: [
      { x: "plane", y: 153 },
      { x: "helicopter", y: 103 },
      { x: "boat", y: 172 },
      { x: "train", y: 185 },
      { x: "subway", y: 69 },
      { x: "bus", y: 117 },
      { x: "car", y: 23 },
      { x: "moto", y: 19 },
      { x: "bicycle", y: 168 },
      { x: "horse", y: 190 },
      { x: "skateboard", y: 254 },
      { x: "others", y: 94 },
    ],
  },
  {
    id: "us",
    data: [
      { x: "plane", y: 16 },
      { x: "helicopter", y: 35 },
      { x: "boat", y: 205 },
      { x: "train", y: 251 },
      { x: "subway", y: 57 },
      { x: "bus", y: 33 },
      { x: "car", y: 220 },
      { x: "moto", y: 253 },
      { x: "bicycle", y: 105 },
      { x: "horse", y: 242 },
      { x: "skateboard", y: 142 },
      { x: "others", y: 171 },
    ],
  },
  {
    id: "germany",
    data: [
      { x: "plane", y: 25 },
      { x: "helicopter", y: 280 },
      { x: "boat", y: 121 },
      { x: "train", y: 36 },
      { x: "subway", y: 238 },
      { x: "bus", y: 82 },
      { x: "car", y: 215 },
      { x: "moto", y: 71 },
      { x: "bicycle", y: 16 },
      { x: "horse", y: 140 },
      { x: "skateboard", y: 162 },
      { x: "others", y: 143 },
    ],
  },
  {
    id: "norway",
    data: [
      { x: "plane", y: 136 },
      { x: "helicopter", y: 267 },
      { x: "boat", y: 197 },
      { x: "train", y: 131 },
      { x: "subway", y: 135 },
      { x: "bus", y: 240 },
      { x: "car", y: 238 },
      { x: "moto", y: 199 },
      { x: "bicycle", y: 134 },
      { x: "horse", y: 178 },
      { x: "skateboard", y: 54 },
      { x: "others", y: 268 },
    ],
  },
];
export default function Line({isDashboard=false}) {
  const mui = useTheme();
  const isSmall = useMediaQuery(mui.breakpoints.down("sm"));

  const lineColor = mui.palette.divider;
  const textPrimary = mui.palette.text.primary;
  const textSecondary = mui.palette.text.secondary;
  return (
    <Box height={isDashboard ? (isSmall ? 320 : "35vh") : (isSmall ? 320 : "75vh")}>
      <ResponsiveLine
        data={data}
        // ⬅️⬅️ السطر المهم ده
        animate={false}
        // (اختياري) تقدر تضيف دي كمان لو حابب ترجع الأنيميشن بعدين
        // motionConfig="stiff"
        theme={{
          background: "transparent",
          axis: {
            domain: {
              line: {
                stroke: lineColor,
                strokeWidth: 1,
              },
            },
            ticks: {
              line: {
                stroke: lineColor,
                strokeWidth: 1,
              },
              text: {
                fill: textSecondary,
                fontSize: isSmall ? 10 : 12,
              },
            },
            legend: {
              text: {
                fill: textPrimary,
                fontSize: isSmall ? 11 : 13,
                fontWeight: 600,
              },
            },
          },
          legends: {
            text: {
              fill: textPrimary,
              fontSize: isSmall ? 10 : 13,
            },
          },
          tooltip: {
            container: {
              background: mui.palette.background.paper,
              color: textPrimary,
              border: `1px solid ${lineColor}`,
              boxShadow: `0 2px 10px rgba(0,0,0,0.25)`,
              borderRadius: 8,
              padding: 8,
            },
          },
        }}
        margin={
          isSmall
            ? { top: 30, right: 20, bottom: 80, left: 50 }
            : { top: 50, right: 110, bottom: 50, left: 60 }
        }
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: isSmall ? -35 : 0,
          legend: isDashboard ? undefined : "transportation",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "count",
          legendOffset: -40,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "seriesColor" }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={
          isSmall
            ? [
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 80,
                  itemWidth: 55,
                  itemHeight: 18,
                  itemsSpacing: 6,
                  symbolSize: 10,
                  symbolShape: "square",
                  itemTextColor: textPrimary,
                },
              ]
            : [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 100,
                  itemWidth: 80,
                  itemHeight: 20,
                  symbolShape: "circle",
                  itemTextColor: textPrimary,
                },
              ]
        }
      />
    </Box>
  );
}

