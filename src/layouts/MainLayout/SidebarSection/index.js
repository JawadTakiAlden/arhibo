import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import { drawerWidth } from "../../../constants";
import { Box, Typography, useTheme } from "@mui/material";
import { menuitems } from "../../../menu-items";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import { useTranslation } from "react-i18next";

const SidebarSection = ({ open }) => {
  const theme = useTheme();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.success.main,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          minWidth: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          flexDirection: "column",
          py: 2,
        }}
      >
        <Logo />
      </Box>
      <Typography
        sx={{
          color: "#fff",
          mt: 2,
          textAlign: "center",
        }}
        variant="h3"
      >
        {t("SidebarSection.header")}
      </Typography>
      <List>
        {menuitems.map(({ id, name, path, icon }) => (
          <ListItem
            sx={{
              width: "95%",
              mb: 1,
              borderRadius: "0px 20px 20px 0px",
              overflow: "hidden",
              backgroundColor: location.pathname.includes(path)
                ? theme.palette.darkBlue.main
                : "",
              color: theme.palette.common.white,
            }}
            key={id}
            disablePadding
          >
            <ListItemButton
              sx={{
                color: "inherit",
              }}
              component={Link}
              to={path}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarSection;
