import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { columns, rows } from './data'

export default function Invoices() {
  return (
    <div>
      <Box
      sx={{
        maxWidth: "98%",
        mx: "auto",
        height: { xs: 520, sm: 560, md: 600 },
      }}
    >
      <DataGrid
      checkboxSelection
      rows={rows} columns={columns} />
    </Box>
    </div>
  )
}
