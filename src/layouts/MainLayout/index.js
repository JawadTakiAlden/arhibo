import * as React from "react";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../../constants";
import BreadcrumbNameMap from "./BreadcrumbNameMap";
import SidebarSection from "./SidebarSection";
import DrawerHeader from "./Drawer/DrawerHeader";
import AppBar from "./Drawer/AppBar";
import { Outlet } from "react-router";
import LanguageSwitcher from "../../components/Language";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const MainLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggel = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          boxShadow: `1px 0px 10px -6px ${alpha(theme.palette.common.black, 0.4)}`,
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleDrawerToggel}
              edge="start"
              color="success"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <BreadcrumbNameMap />
          </Box>
          <LanguageSwitcher fontcolor={theme.palette.darkBlue.main} />
        </Toolbar>
      </AppBar>
      <SidebarSection open={open} />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
