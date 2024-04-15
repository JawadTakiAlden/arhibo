import { Box, Typography } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";
import LoginImage from "../../../assets/images/login.png";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 112px)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: { md: 1 },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "48px",
            textAlign: "center",
            mb: 3,
          }}
        >
          {t("Login.login")}
        </Typography>

        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "20",
            color: "#777777",
            textAlign: "center",
            mb: 3,
          }}
        >
          {t("Login.owner")}
        </Typography>

        <LoginForm />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={LoginImage} alt="login" style={{ maxWidth: "100%" }} />
      </Box>
    </Box>
  );
};

export default Login;
