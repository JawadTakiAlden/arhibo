import { Box, CircularProgress, alpha, useTheme } from '@mui/material'
import React from 'react'

const TemproryLoader = ({loading = false}) => {
    const theme = useTheme()
  return (
    <Box
        sx={{
            width : '70px',
            height : '70px',
            borderRadius : '50%',
            backgroundColor : alpha(theme.palette.success.main , 0.5),
            color : 'white',
            boxShadow : `0px 0px 10px -5px ${theme.palette.success.dark}`,
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            position : 'fixed',
            left : '50%',
            top : '70px',
            backdropFilter : 'blur(10px)',
            transition : '0.3s',
            transform : `translateX(-50%) scale(${loading ? 1 : 0})`,
            zIndex : '1000'
        }}
    >
        <CircularProgress color='inherit' variant='indeterminate' />
    </Box>
  )
}

export default TemproryLoader