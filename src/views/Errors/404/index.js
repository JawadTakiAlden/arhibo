import { Box } from '@mui/material'
import React from 'react'
import NotFoundImage from '../../../assets/images/404.jpeg'

const Page404 = () => {
  return (
    <Box
        sx={{
            position : 'relative',
            width : '100vw',
            height : '100vh'
        }}
    >
        <img
            src={NotFoundImage}
            alt='404'
            style={{
                position : 'absolute',
                width : '100%',
                height :'100%',
                left : '0',
                top : '0',
                objectFit :'fill'
            }}
        />
    </Box>
  )
}

export default Page404