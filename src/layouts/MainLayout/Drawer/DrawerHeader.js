import { styled } from "@mui/material";

const DrawerHeader = styled('div')(({ theme , backgroundColor , padding = null}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center',
    flexDirection : 'column',
    color : 'white',
    padding: padding || theme.spacing(0, 1),
    backgroundColor : backgroundColor,
    ...theme.mixins.toolbar,
  }));

  export default DrawerHeader