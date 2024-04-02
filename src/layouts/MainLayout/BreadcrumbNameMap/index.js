import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react'
import LinkRouter from './LinkRouter';
import { useLocation } from 'react-router';
import { breadcrumbNameMap } from '../../../routes/breadcrumbNameMap';

const BreadcrumbNameMap = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (
      <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        let to = `/${pathnames.slice(0, index + 1).join('/')}`;
        if(to === '/dashboard') {
            to = to + '/home'
        }
        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to] || value}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to] || value}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
    )
}

export default BreadcrumbNameMap