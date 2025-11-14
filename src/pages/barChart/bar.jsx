import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const data = [
  {
    year: "2015",
    spain: 1200,
    france: 900,
    usa: 1300,
    germany: 1000,
    italy: 850,
  },
  {
    year: "2016",
    spain: 1280,
    france: 950,
    usa: 1380,
    germany: 1008,
    italy: 900,
  },
  {
    year: "2017",
    spain: 1360,
    france: 1020,
    usa: 1460,
    germany: 1150,
    italy: 906,
  },
  {
    year: "2018",
    spain: 1470,
    france: 1100,
    usa: 1550,
    germany: 1230,
    italy: 1003,
  },
  {
    year: "2019",
    spain: 1580,
    france: 1180,
    usa: 1650,
    germany: 1320,
    italy: 1010,
  },
  {
    year: "2020",
    spain: 1300,
    france: 1000,
    usa: 1380,
    germany: 1150,
    italy: 905,
  },
  {
    year: "2021",
    spain: 1450,
    france: 1120,
    usa: 1520,
    germany: 1250,
    italy: 1004,
  },
  {
    year: "2022",
    spain: 1550,
    france: 1200,
    usa: 1600,
    germany: 1303,
    italy: 1100,
  },
  {
    year: "2023",
    spain: 1630,
    france: 1260,
    usa: 1680,
    germany: 1400,
    italy: 1105,
  },
  {
    year: "2024",
    spain: 1720,
    france: 1330,
    usa: 1770,
    germany: 1480,
    italy: 1200,
  },
  {
    year: "2025",
    spain: 1800,
    france: 1400,
    usa: 1850,
    germany: 1550,
    italy: 1250,
  },
];

export default function Bar({ isDashboard = false }) {
  const mui = useTheme();
  const lineColor = mui.palette.divider;
  const textColor = mui.palette.text.secondary;
  const textPrimary = mui.palette.text.primary;
  const keys = ["usa", "spain", "france", "germany", "italy"];

  // هنا بنحدد الداتا اللي هتظهر حسب الداشبورد ولا لأ
  const displayedData = isDashboard ? data.slice(-5) : data;

  const step = 500;
  const maxTotal = Math.max(
    ...displayedData.map((d) => keys.reduce((s, k) => s + (d[k] || 0), 0))
  );
  const maxRounded = Math.ceil(maxTotal / step) * step;
  const yTicks = Array.from(
    { length: maxRounded / step + 1 },
    (_, i) => i * step
  );

  return (
    <div>
      <Box
        height={isDashboard?"400px":"75vh"}
        width="100%"
        sx={{
          minWidth: isDashboard ? "100%" : 800,
        }}
      >
        <ResponsiveBar
          data={displayedData}  // استخدمنا displayedData بدل data
          keys={keys}
          indexBy="year"
          margin={{ top: 50, right: 130, bottom: 60, left: 70 }}
          padding={0.3}
          valueScale={{ type: "linear", min: 0, max: maxRounded }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: mui.palette.mode === "dark" ? "dark2" : "paired" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            legend: isDashboard ? undefined : "Year",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: isDashboard ? undefined : "Salary (USD)",
            legendPosition: "middle",
            legendOffset: -55,
            tickValues: yTicks,
            format: (v) => v.toLocaleString(),
          }}
          enableGridX={false}
          enableGridY={true}
          gridYValues={yTicks}
          theme={{
            background: "transparent",
            axis: {
              domain: {
                line: {
                  stroke: mui.palette.mode === "dark" ? "#9e9e9e" : "black",
                  strokeWidth: 1,
                },
              },
              ticks: {
                line: { stroke: lineColor, strokeWidth: 1 },
                text: { fill: textColor, fontSize: 12 },
              },
              legend: {
                text: {
                  fill: mui.palette.mode === "dark" ? "#fafafa" : "#006064",
                  fontSize: 12,
                },
              },
            },
            grid: {
              line: {
                stroke: mui.palette.mode === "dark" ? "#fafafa" : "#006064",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              },
            },
            legends: {
              text: {
                fill: mui.palette.mode === "dark" ? "#80bfff" : "#111827",
              },
            },
            labels: { text: { fill: textPrimary } },
            tooltip: {
              container: {
                background: mui.palette.background.paper,
                color: textPrimary,
                border: `1px solid ${lineColor}`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
              },
            },
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              translateX: 120,
              itemWidth: 100,
              itemHeight: 18,
              itemsSpacing: 4,
              symbolSize: 15,
            },
          ]}
          tooltip={({ id, color, indexValue, value }) => (
            <div
              style={{ padding: "8px 10px", borderLeft: `4px solid ${color}` }}
            >
              <div style={{ fontWeight: 600 }}>{String(id).toUpperCase()}</div>
              <div>Year: {indexValue}</div>
              <div>Salary: {Number(value).toLocaleString()}</div>
            </div>
          )}
        />
      </Box>
    </div>
  );
}
