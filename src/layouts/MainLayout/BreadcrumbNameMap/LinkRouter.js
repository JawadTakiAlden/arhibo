import { Link } from '@mui/material'
import React from 'react'
import {
    Link as RouterLink
} from 'react-router-dom'

const LinkRouter = (props) => {
  return (
    <Link {...props} component={RouterLink} />
  )
}

export default LinkRouter