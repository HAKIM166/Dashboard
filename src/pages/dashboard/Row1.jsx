/**
 * Dashboard Row 1
 * ----------------
 * Four responsive KPI cards displaying key metrics with icons
 * and mini donut charts for quick visual insights.
 */

import { Stack, useTheme } from "@mui/material";
import React from "react";
import Card from "./card";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { data1, data2, data3, data4 } from "./data";

export default function Row1() {
  const Theme = useTheme();
  const isDark = Theme.palette.mode === "dark";

  const iconColor = isDark ? Theme.palette.warning.light : Theme.palette.info.main;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={1}
      justifyContent={{ xs: "center", md: "space-between" }}
    >
      <Card
        icon={<EmailIcon sx={{ fontSize: 23, color: iconColor }} />}
        title={"12,361"}
        subTitle={"Emails Sent"}
        increase={"+23%"}
        data={data1}
        scheme={"set3"}
      />
      <Card
        icon={<PointOfSaleIcon sx={{ fontSize: 23, color: iconColor }} />}
        title={"431,225"}
        subTitle={"Sales Obtained"}
        increase={"+32%"}
        data={data2}
        scheme={"red_grey"}
      />
      <Card
        icon={<PersonAddIcon sx={{ fontSize: 23, color: iconColor }} />}
        title={"32,441"}
        subTitle={"New Clients"}
        increase={"+3%"}
        data={data3}
        scheme={"green_blue"}
      />
      <Card
        icon={<TrafficIcon sx={{ fontSize: 23, color: iconColor }} />}
        title={"1,325,134"}
        subTitle={"Traffic Received"}
        increase={"+54%"}
        data={data4}
        scheme={"brown_blueGreen"}
      />
    </Stack>
  );
}
