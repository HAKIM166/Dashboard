/**
 * Bar Chart Page
 * ---------------
 * Stacked bar visualization for yearly salary data with a responsive layout
 * and an optional compact mode for embedding inside dashboard widgets.
 */

import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header";

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
  const isMobile = useMediaQuery(mui.breakpoints.down("sm"));

  const lineColor = mui.palette.divider;
  const textColor = mui.palette.text.secondary;
  const textPrimary = mui.palette.text.primary;
  const keys = ["usa", "spain", "france", "germany", "italy"];

  const displayedData = isDashboard ? data.slice(-5) : data;

  const step = isMobile ? 1000 : 500;
  const maxTotal = Math.max(
    ...displayedData.map((d) => keys.reduce((s, k) => s + (d[k] || 0), 0))
  );
  const maxRounded = Math.ceil(maxTotal / step) * step;
  const yTicks = Array.from(
    { length: maxRounded / step + 1 },
    (_, i) => i * step
  );

  const xTickValues = isMobile
    ? displayedData.map((d, i) => (i % 2 === 0 ? d.year : null)).filter(Boolean)
    : undefined;

  const chartMargin = isMobile
    ? { top: 40, right: 10, bottom: 50, left: 55 }
    : { top: 50, right: 130, bottom: 60, left: 70 };

  const legends = isMobile
    ? [
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateY: isDashboard ? 50 : 60,
          itemWidth: 60,
          itemHeight: 30,
          itemsSpacing: 4,
          symbolSize: 14,
        },
      ]
    : [
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
      ];

  const chartHeight = isDashboard
    ? isMobile
      ? 320
      : 360
    : isMobile
    ? 370
    : "75vh";

  return (
    <Box sx={{ width: "100%" }}>
      {!isDashboard && (
        <Header
          title={"BAR CHART"}
          subTitle={"Compare categories with a simple bar visualization"}
        />
      )}

      <Box
        sx={{
          width: "100%",
          height: chartHeight,
          minWidth: isDashboard ? "100%" : isMobile ? "100%" : 800,
          mx: "auto",
        }}
      >
        <ResponsiveBar
          data={displayedData}
          keys={keys}
          indexBy="year"
          margin={chartMargin}
          padding={0.3}
          valueScale={{ type: "linear", min: 0, max: maxRounded }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: mui.palette.mode === "dark" ? "dark2" : "paired" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: isMobile ? -20 : 0,
            tickValues: xTickValues,
            legend: isMobile ? undefined : "Year",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: isMobile ? undefined : "Salary (USD)",
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
                text: {
                  fill: textColor,
                  fontSize: isMobile ? 10 : 12,
                },
              },
              legend: {
                text: {
                  fill: mui.palette.mode === "dark" ? "#fafafa" : "#006064",
                  fontSize: isMobile ? 10 : 12,
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
                fontSize: isMobile ? 10 : 12,
              },
            },
            labels: {
              text: { fill: textPrimary, fontSize: isMobile ? 9 : 11 },
            },
            tooltip: {
              container: {
                background: mui.palette.background.paper,
                color: textPrimary,
                border: `1px solid ${lineColor}`,
                boxShadow: `0 2px 10px rgba(0,0,0,0.25)`,
              },
            },
          }}
          enableLabel={!isMobile}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
          legends={legends}
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
                fontSize: isMobile ? "18px" : "22px",
              }}
            >
              Salary Growth Overview 📊
            </h3>
            <p
              style={{
                margin: 0,
                marginTop: "6px",
                fontSize: isMobile ? "13px" : "15px",
                color: textColor,
              }}
            >
              This chart shows the yearly stacked salaries for each country.
              Compare trends over time and see how each region contributes to
              the total.
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
            <StatCard
              title="Peak Year"
              value="2025"
              description="Highest total salary across all countries."
              delay="0.7s"
            />
            <StatCard
              title="Top Country"
              value="USA"
              description="Consistently leading the stacked values."
              delay="0.9s"
            />
            <StatCard
              title="Avg Growth"
              value="~5% / year"
              description="Approximate increase in combined salaries."
              delay="1.1s"
            />
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
                  color: textColor,
                  fontWeight: 500,
                }}
              >
                Key observations
              </h4>
              <ul
                style={{
                  margin: "6px 0 0",
                  paddingLeft: "18px",
                  fontSize: "13px",
                  color: textColor,
                }}
              >
                <li>Salaries show a steady upward trend after 2020.</li>
                <li>Spain and France follow similar growth patterns.</li>
                <li>Germany and Italy remain close to the global average.</li>
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
                  color: textColor,
                  fontWeight: 500,
                }}
              >
                How to use this chart
              </h4>
              <p
                style={{
                  margin: "6px 0 8px",
                  fontSize: "13px",
                  color: textColor,
                }}
              >
                Focus on sudden jumps or drops in the stacked bars to catch
                anomalies. Combine this view with your line or pie charts to get
                a full picture of the data.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: textColor,
                  opacity: 0.9,
                }}
              >
                Tip: hover over any segment to see exact values for that country
                and year.
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

/** Reusable small statistic card component */
function StatCard({ title, value, description, delay = "0s" }) {
  return (
    <Box
      sx={(theme) => ({
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        textAlign: "center",
        animation: `fadeIn ${delay} ease-in-out`,
      })}
    >
      <h4
        style={{
          margin: 0,
          fontSize: "15px",
          color: "rgba(255,255,255,0.7)",
          fontWeight: 500,
        }}
      >
        {title}
      </h4>
      <p
        style={{
          margin: "4px 0 0",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        {value}
      </p>
      <p
        style={{
          margin: "2px 0 0",
          fontSize: "12px",
          opacity: 0.9,
        }}
      >
        {description}
      </p>
    </Box>
  );
}
