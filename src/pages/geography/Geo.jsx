import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geo } from "./world_countries";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { data } from "./data.js";

export default function Geo({ isDashboard = false }) {
  const mui = useTheme();

  const isSm = useMediaQuery(mui.breakpoints.down("sm"));
  const isMd = useMediaQuery(mui.breakpoints.between("sm", "md"));
  const isLgDown = useMediaQuery(mui.breakpoints.down("lg"));

  const isDark = mui.palette.mode === "dark";

  const lineColor = mui.palette.divider;
  const textPrimary = mui.palette.text.primary;
  const textSecondary = mui.palette.text.secondary;

  // ألوان الخريطة حسب اللايت/دارك مود
  const choroplethColors = isDark ? "YlGnBu" : "RdBu";

  // تكبير/تصغير وترجمة الخريطة حسب حجم الشاشة
  let projectionScale = 150;
let projectionTranslation = [0.5, 0.5];

if (isSm) {
  projectionScale = isDashboard ? 140 : 75;
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


  return (
    <Box
      sx={{
        width: "100%",
        height: isDashboard
          ? "62.5vh"
          : {
              xs: 380,
              sm: 420,
              md: 470,
              lg: 520,
              xl: 580,
            },

        border: `1px solid ${mui.palette.divider}`,
        borderRadius: 2,
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
                      // موبايل
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
                      // تابلت / ديسكتوب
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
  );
}
