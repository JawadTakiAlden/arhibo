import { Box } from '@mui/material'
import React from 'react'
import MinimalHeader from './MinimalHeader'
import { Outlet } from 'react-router'

const MinimalLayout = () => {
  return (
    <Box>
        <MinimalHeader />
        <Outlet />
    </Box>
  )
}

export default MinimalLayout