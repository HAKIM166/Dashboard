/**
 * Line Chart
 * ----------
 * Multi-series line chart built with Nivo, showing category trends
 * per country, with an optional compact mode for dashboard embedding
 * and descriptive insight blocks on the full page.
 */

import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import Header from "../../components/Header";

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

function StatBox({ title, value, description, delay = "0s" }) {
  return (
    <Box
      sx={(theme) => ({
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        animation: `fadeIn 0.6s ease-in-out`,
        animationDelay: delay,
        animationFillMode: "backwards",
      })}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "text.secondary", fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Typography variant="h6" sx={{ mt: 0.5 }}>
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{ display: "block", mt: 0.5, color: "text.secondary" }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export default function Line({ isDashboard = false }) {
  const mui = useTheme();
  const isSmall = useMediaQuery(mui.breakpoints.down("sm"));

  const lineColor = mui.palette.divider;
  const textPrimary = mui.palette.text.primary;
  const textSecondary = mui.palette.text.secondary;

  const categories = data[0]?.data?.map((point) => point.x) ?? [];

  const chartHeight = isDashboard
    ? isSmall
      ? 320
      : "35vh"
    : isSmall
    ? 320
    : "75vh";

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {!isDashboard && (
        <Header
          title={"LINE CHART"}
          subTitle={"Monitor trends and changes over time"}
        />
      )}
      <Box height={chartHeight}>
        <ResponsiveLine
          data={data}
          animate={false}
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

      {!isDashboard && (
        <Box
          sx={{
            mt: 3,
            px: { xs: 2, md: 3 },
            pb: 3,
            borderRadius: 2,
            backgroundColor: mui.palette.background.default,
            border: `1px solid ${mui.palette.divider}`,
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant={isSmall ? "h6" : "h5"}
              sx={{ color: textPrimary, mb: 0.5 }}
            >
              Multi-country transportation trends 🚆✈️
            </Typography>
            <Typography variant="body2" sx={{ color: textSecondary }}>
              Each line represents a different country and how often each
              transportation method is used. Look for intersections and spikes
              to detect where countries behave similarly or diverge.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
              mb: 3,
            }}
          >
            <StatBox
              title="Most volatile"
              value="Germany"
              description="Shows sharp changes between categories like helicopter and subway."
              delay="0.3s"
            />
            <StatBox
              title="Most balanced"
              value="Norway"
              description="Relatively consistent usage across most transportation modes."
              delay="0.45s"
            />
            <StatBox
              title="Peak usage"
              value="Car & Skateboard"
              description="Often reaching the highest counts in several countries."
              delay="0.6s"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 3fr" },
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: mui.palette.background.paper,
                border: `1px solid ${mui.palette.divider}`,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: textSecondary, fontWeight: 600, mb: 1 }}
              >
                Trend notes
              </Typography>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 13,
                  color: textSecondary,
                }}
              >
                <li>
                  Public transport (train, subway, bus) varies heavily by
                  country.
                </li>
                <li>Car usage spikes strongly in the US and Germany.</li>
                <li>
                  Alternative options like bicycle and skateboard are more
                  niche.
                </li>
              </ul>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: mui.palette.background.paper,
                border: `1px solid ${mui.palette.divider}`,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: textSecondary, fontWeight: 600, mb: 1 }}
              >
                Transportation categories
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: textSecondary, mb: 1.5 }}
              >
                These categories form the x-axis of the chart. Use them as quick
                filters or labels in other parts of your dashboard.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {categories.map((cat) => (
                  <Box
                    key={cat}
                    sx={(theme) => ({
                      px: 1.4,
                      py: 0.6,
                      borderRadius: 999,
                      fontSize: 12,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary,
                      textTransform: "capitalize",
                    })}
                  >
                    {cat}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}
          </style>
        </Box>
      )}
    </Box>
  );
}
