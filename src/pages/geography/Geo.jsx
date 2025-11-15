/**
 * Geography Chart
 * ----------------
 * Responsive choropleth map of global metrics with theme-aware styling,
 * adaptive projection for different breakpoints, and an optional compact
 * layout when embedded inside the main dashboard.
 */

import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geo } from "./world_countries";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { data } from "./data.js";
import Header from "../../components/Header";

export default function Geo({ isDashboard = false }) {
  const mui = useTheme();

  const isSm = useMediaQuery(mui.breakpoints.down("sm"));
  const isMd = useMediaQuery(mui.breakpoints.between("sm", "md"));
  const isLgDown = useMediaQuery(mui.breakpoints.down("lg"));

  const isDark = mui.palette.mode === "dark";

  const lineColor = mui.palette.divider;
  const textPrimary = mui.palette.text.primary;
  const textSecondary = mui.palette.text.secondary;

  const choroplethColors = isDark ? "YlGnBu" : "RdBu";

  let projectionScale = 150;
  let projectionTranslation = [0.5, 0.5];

  if (isSm) {
    projectionScale = isDashboard ? 90 : 75;
    projectionTranslation = [0.5, 0.42];
  } else if (isMd) {
    projectionScale = isDashboard ? 150 : 105;
    projectionTranslation = [0.5, 0.47];
  } else if (isLgDown) {
    projectionScale = isDashboard ? 170 : 130;
    projectionTranslation = [0.5, 0.5];
  } else {
    projectionScale = isDashboard ? 75 : 150;
    projectionTranslation = [0.5, 0.5];
  }

  const mapHeight = isDashboard
    ? { xs: 260, sm: 320, md: 410 }
    : { xs: 360, sm: 420, md: 470, lg: 520, xl: 580 };

  return (
    <Box sx={{ width: "100%" }}>
      {!isDashboard && (
        <Header
          title={"GEOGRAPHY CHART"}
          subTitle={"Explore your metrics across regions and countries"}
        />
      )}

      <Box
        sx={{
          width: "100%",
          height: mapHeight,
          border: `1px solid ${mui.palette.divider}`,
          borderRadius: 1,
          overflow: "hidden",
          backgroundColor: mui.palette.background.paper,
        }}
      >
        <ResponsiveChoropleth
          data={data}
          features={geo.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={choroplethColors}
          domain={[0, 1000000]}
          projectionScale={projectionScale}
          projectionTranslation={projectionTranslation}
          theme={{
            background: "transparent",
            textColor: textPrimary,
            labels: {
              text: {
                fill: textPrimary,
                fontSize: isSm ? 9 : 11,
              },
            },
            legends: {
              text: {
                fill: textPrimary,
                fontSize: isSm ? 9 : 11,
              },
            },
            tooltip: {
              container: {
                background: mui.palette.background.paper,
                color: textPrimary,
                border: `1px solid ${lineColor}`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                borderRadius: 8,
                padding: 8,
              },
            },
          }}
          unknownColor={isDark ? mui.palette.grey[800] : "#666666"}
          label="properties.name"
          valueFormat=".2s"
          enableGraticule={true}
          graticuleLineColor={
            isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"
          }
          borderWidth={1.5}
          borderColor={isDark ? "#fff" : "#202b38"}
          legends={
            isDashboard
              ? []
              : [
                  isSm
                    ? {
                        anchor: "bottom-left",
                        direction: "column",
                        justify: false,
                        translateX: 10,
                        translateY: -40,
                        itemsSpacing: 2,
                        itemWidth: 80,
                        itemHeight: 16,
                        itemDirection: "left-to-right",
                        itemTextColor: textSecondary,
                        itemOpacity: 0.85,
                        symbolSize: 10,
                      }
                    : {
                        anchor: "bottom-left",
                        direction: "column",
                        justify: true,
                        translateX: 20,
                        translateY: -80,
                        itemsSpacing: 4,
                        itemWidth: 94,
                        itemHeight: 18,
                        itemDirection: "left-to-right",
                        itemTextColor: textSecondary,
                        itemOpacity: 0.85,
                        symbolSize: 18,
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
            <h3
              style={{
                margin: 0,
                color: textPrimary,
                fontSize: isSm ? "18px" : "22px",
              }}
            >
              Global Overview 🌍
            </h3>
            <p
              style={{
                margin: 0,
                marginTop: "6px",
                fontSize: isSm ? "13px" : "15px",
                color: textSecondary,
              }}
            >
              Explore how the metric is distributed across different regions.
              Hover or tap any country on the map to see its exact value.
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
              mt: 1,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: mui.palette.background.paper,
                border: `1px solid ${mui.palette.divider}`,
                textAlign: "center",
                animation: "fadeIn 0.7s ease-in-out",
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
                Highest Value
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  color: textPrimary,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                1.0M+
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "12px",
                  color: textSecondary,
                }}
              >
                Top-performing region globally.
              </p>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: mui.palette.background.paper,
                border: `1px solid ${mui.palette.divider}`,
                textAlign: "center",
                animation: "fadeIn 0.9s ease-in-out",
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
                Countries Tracked
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  color: textPrimary,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                190+
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "12px",
                  color: textSecondary,
                }}
              >
                Almost full global coverage.
              </p>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: mui.palette.background.paper,
                border: `1px solid ${mui.palette.divider}`,
                textAlign: "center",
                animation: "fadeIn 1.1s ease-in-out",
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
                Average Value
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  color: textPrimary,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                ~420k
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "12px",
                  color: textSecondary,
                }}
              >
                Gives a rough baseline for comparison.
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
                Top regions
              </h4>
              <ul
                style={{
                  margin: "6px 0 0",
                  paddingLeft: "18px",
                  fontSize: "13px",
                  color: textSecondary,
                }}
              >
                <li>North America shows consistently high values.</li>
                <li>Western Europe remains above the global average.</li>
                <li>Several African countries show emerging growth trends.</li>
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
                Quick insights
              </h4>
              <p
                style={{
                  margin: "6px 0 8px",
                  fontSize: "13px",
                  color: textSecondary,
                }}
              >
                Use the map interactively to compare countries and detect
                clusters with similar performance.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: textSecondary,
                  opacity: 0.9,
                }}
              >
                Tip: combine this view with your bar/line charts to link
                geographic patterns with time trends.
              </p>
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
