import { Box, alpha, useTheme } from "@mui/material";
import React from "react";
import Logo from "../../../components/Logo";
import LanguageSwitcher from "../../../components/Language";

const MinimalHeader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "90%",
        mx: "auto",
        height: "80px",
        my: 2,
        borderRadius: "30px",
        backdropFilter: "blur(10px)",
        backgroundColor: alpha(theme.palette.success.main, 0.7),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 4,
        boxShadow: "1px 1px 10px -6px rgba(0,0,0)",
      }}
    >
      <Logo />
      <LanguageSwitcher />
    </Box>
  );
};

export default MinimalHeader;
