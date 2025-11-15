/**
 * Dashboard Row 2
 * ----------------
 * Combined revenue line chart and recent transactions list,
 * giving a quick view of financial performance and latest activity.
 */

import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Line from "../../pages/lineChart/Line";
import React from "react";
import { DownloadOutlined } from "@mui/icons-material";
import { Transactions } from "./data";

export default function Row2() {
  const Theme = useTheme();
  const isDark = Theme.palette.mode === "dark";

  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={1.5} mt={2}>
      <Paper sx={{ flex: "1 1 320px", minWidth: { xs: "100%", sm: 320 } }}>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Typography
              color={
                isDark ? Theme.palette.warning.light : Theme.palette.info.main
              }
              mb={1}
              mt={2}
              ml={4}
              variant="h6"
            >
              Revenue Generated
            </Typography>
            <Typography variant="h4" ml={4}>
              $59,342.32
            </Typography>
          </Box>
          <Box sx={{ mr: 3 }}>
            <IconButton>
              <DownloadOutlined />
            </IconButton>
          </Box>
        </Stack>

        <Line isDashboard={true} />
      </Paper>

      <Box
        sx={{
          overflow: "auto",
          minWidth: { xs: "100%", sm: 280 },
          height: 360,
          flex: "1",
        }}
      >
        <Paper>
          <Typography
            color={
              isDark ? Theme.palette.warning.light : Theme.palette.info.main
            }
            fontWeight={"bold"}
            p={1.2}
            variant="h6"
          >
            Recent Transactions
          </Typography>
        </Paper>

        {Transactions.map((tx, index) => {
          return (
            <Paper
              key={tx.id || index}
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 1,
              }}
            >
              <Box p={1.2}>
                <Typography variant="body1" fontWeight="600">
                  {tx.user}
                </Typography>
                <Typography variant="body2">{tx.date}</Typography>
              </Box>

              <Typography variant="body2">{tx.txId}</Typography>

              <Typography
                borderRadius={1.4}
                p={1}
                bgcolor={Theme.palette.error.main}
                color={Theme.palette.getContrastText(
                  Theme.palette.error.main
                )}
                variant="body2"
              >
                ${tx.cost}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Stack>
  );
}
