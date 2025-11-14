import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme, useMediaQuery } from "@mui/material";

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
  const isSmall = useMediaQuery(mui.breakpoints.down("sm"));
  const legendFontSize = isSmall ? 12 : 19;

  return (
    <Box
      height={isDashboard ? (isSmall ? 320 : "300px") : isSmall ? 360 : "75vh"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box flex="1 1 auto">
        <ResponsivePie
          data={data}
          /** 👇 مؤقتًا نلغي الأنيميشن عشان نتأكد الخطأ منها */
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

      {/* ✅ legend للموبايل بس، ومش في الداشبورد */}
      {isSmall && !isDashboard && (
        <Box
          mt={1.5}
          display="flex"
          justifyContent="center"
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
  );
}
