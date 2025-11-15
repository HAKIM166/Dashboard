/**
 * Pie Chart
 * ---------
 * Donut-style pie chart using Nivo with responsive layout and
 * an optional descriptive section when rendered as a full page
 * (isDashboard = false).
 */

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";

const data = [
  { id: "haskell", label: "haskell", value: 111, color: "hsl(180, 70%, 50%)" },
  { id: "elixir", label: "elixir", value: 46, color: "hsl(201, 70%, 50%)" },
  { id: "php", label: "php", value: 34, color: "hsl(215, 70%, 50%)" },
  { id: "css", label: "css", value: 498, color: "hsl(201, 70%, 50%)" },
  { id: "hack", label: "hack", value: 169, color: "hsl(40, 70%, 50%)" },
];

export default function Pie({ isDashboard = false }) {
  const mui = useTheme();
  const lineColor = mui.palette.divider;
  const textPrimary = mui.palette.text.primary;
  const textSecondary = mui.palette.text.secondary;
  const isSmall = useMediaQuery(mui.breakpoints.down("sm"));
  const legendFontSize = isSmall ? 12 : 19;

  const chartHeight = isDashboard
    ? isSmall
      ? 260
      : 280
    : isSmall
    ? 320
    : "70vh";

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {!isDashboard && (
        <Header
          title={"PIE CHART"}
          subTitle={"See how your data is distributed at a glance"}
        />
      )}

      <Box
        sx={{
          height: chartHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box flex="1 1 auto">
          <ResponsivePie
            data={data}
            animate={false}
            theme={{
              background: "transparent",
              legends: {
                text: {
                  fill: mui.palette.mode === "dark" ? "#80bfff" : "#111827",
                  fontSize: legendFontSize,
                },
              },
              labels: {
                text: {
                  fill: textPrimary,
                  fontSize: isSmall ? 12 : 14,
                  fontWeight: 600,
                },
              },
              tooltip: {
                container: {
                  background: mui.palette.background.paper,
                  color: textPrimary,
                  border: `1px solid ${lineColor}`,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                },
              },
            }}
            margin={
              isDashboard
                ? { top: 10, right: 10, bottom: 10, left: 10 }
                : isSmall
                ? { top: 20, right: 20, bottom: 20, left: 20 }
                : { top: 40, right: 80, bottom: 80, left: 80 }
            }
            innerRadius={isDashboard ? 0.8 : 0.5}
            padAngle={0.6}
            cornerRadius={2}
            activeOuterRadiusOffset={8}
            borderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={
              mui.palette.mode === "dark" ? "#424242" : "#111827"
            }
            enableArcLinkLabels={!isSmall && !isDashboard}
            enableArcLabels={!isDashboard}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLinkLabelsTextColor={
              mui.palette.mode === "dark" ? "white" : "#111827"
            }
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              { match: { id: "ruby" }, id: "dots" },
              { match: { id: "c" }, id: "dots" },
              { match: { id: "go" }, id: "dots" },
              { match: { id: "python" }, id: "dots" },
              { match: { id: "scala" }, id: "lines" },
              { match: { id: "lisp" }, id: "lines" },
              { match: { id: "elixir" }, id: "lines" },
              { match: { id: "javascript" }, id: "lines" },
            ]}
            legends={
              isSmall || isDashboard
                ? []
                : [
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolShape: "circle",
                      itemTextColor: textPrimary,
                    },
                  ]
            }
          />
        </Box>
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
            <h3
              style={{
                margin: 0,
                color: textPrimary,
                fontSize: isSmall ? "18px" : "22px",
              }}
            >
              Stack Usage Breakdown 🧩
            </h3>
            <p
              style={{
                margin: 0,
                marginTop: "6px",
                fontSize: isSmall ? "13px" : "15px",
                color: textSecondary,
              }}
            >
              Each slice represents the relative usage of different technologies
              in the current stack. Use this chart to spot dominant and niche
              languages.
            </p>
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
              <h4
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: textSecondary,
                  fontWeight: 500,
                }}
              >
                Most used
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: textPrimary,
                }}
              >
                css
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "12px",
                  color: textSecondary,
                }}
              >
                Represents the largest slice in the chart.
              </p>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: mui.palette.background.paper,
                border: `1px solid ${mui.palette.divider}`,
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: textSecondary,
                  fontWeight: 500,
                }}
              >
                Supporting tools
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: textPrimary,
                }}
              >
                haskell / hack
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "12px",
                  color: textSecondary,
                }}
              >
                Smaller slices but still important in the ecosystem.
              </p>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: mui.palette.background.paper,
                border: `1px solid ${mui.palette.divider}`,
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: textSecondary,
                  fontWeight: 500,
                }}
              >
                Balance
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: textPrimary,
                }}
              >
                Mixed
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "12px",
                  color: textSecondary,
                }}
              >
                No single tech completely dominates the stack.
              </p>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 3,
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
              <h4
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: textSecondary,
                  fontWeight: 500,
                }}
              >
                Quick insights
              </h4>
              <ul
                style={{
                  margin: "6px 0 0",
                  paddingLeft: "18px",
                  fontSize: "13px",
                  color: textSecondary,
                }}
              >
                <li>CSS clearly leads the distribution.</li>
                <li>
                  Languages like PHP and Elixir form smaller but relevant
                  segments.
                </li>
                <li>Use the legend to quickly identify colors and labels.</li>
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
              <h4
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: textSecondary,
                  fontWeight: 500,
                }}
              >
                How to read this chart
              </h4>
              <p
                style={{
                  margin: "6px 0 8px",
                  fontSize: "13px",
                  color: textSecondary,
                }}
              >
                Look at the relative angle and area of each slice rather than
                absolute numbers. Combine this with your bar charts to see how
                usage changes over time.
              </p>

              {isSmall && (
                <Box
                  mt={1.5}
                  display="flex"
                  justifyContent="flex-start"
                  flexWrap="wrap"
                  gap={1.2}
                >
                  {data.map((item) => (
                    <Box
                      key={item.id}
                      display="flex"
                      alignItems="center"
                      sx={{ fontSize: 14 }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                          mr: 0.5,
                        }}
                      />
                      {item.label}
                    </Box>
                  ))}
                </Box>
              )}
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
