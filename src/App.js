
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/200.css"; // Specify weight
import "@fontsource/poppins/200-italic.css"; // Specify weight and style
import "@fontsource/poppins/200.css"; // Specify weight
import "@fontsource/poppins/200-italic.css"; // Specify weight and style
import "@fontsource/poppins/300.css"; // Specify weight
import "@fontsource/poppins/300-italic.css"; // Specify weight and style
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import "@fontsource/poppins/500.css"; // Specify weight
import "@fontsource/poppins/500-italic.css"; // Specify weight and style
import "@fontsource/poppins/600.css"; // Specify weight
import "@fontsource/poppins/600-italic.css"; // Specify weight and style
import "@fontsource/poppins/700.css"; // Specify weight
import "@fontsource/poppins/700-italic.css"; // Specify weight and style
import "@fontsource/poppins/800.css"; // Specify weight
import "@fontsource/poppins/800-italic.css"; // Specify weight and style
import "@fontsource/poppins/900.css"; // Specify weight
import "@fontsource/poppins/900-italic.css";
import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./themes";
import { Navigate } from "react-router";
import RTL from "./components/RTL/RTL";
import { useTranslation } from "react-i18next";
import ThemeRoutes from "./routes";

const RedirectPage = () => {
  if (localStorage.getItem("token-admin-arhibo")) {
    return <Navigate to={"/dashbaord/default"} />;
  } else {
    return <Navigate to={"/auth/login"} />;
  }
};

const App = () => {
  const { i18n } = useTranslation();
  return i18n.language === "ar" ? (
    <RTL>
      <ThemeProvider theme={Theme()}>
        <CssBaseline />
        <ThemeRoutes />
      </ThemeProvider>
    </RTL>
  ) : (
    <ThemeProvider theme={Theme()}>
      <CssBaseline />
      <ThemeRoutes />
    </ThemeProvider>
  );
};

export default App;
