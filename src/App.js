import "@fontsource/poppins";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/200-italic.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/200-italic.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/500-italic.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/700-italic.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/800-italic.css";
import "@fontsource/poppins/900.css";
import "@fontsource/poppins/900-italic.css";
import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./themes";
import RTL from "./components/RTL/RTL";
import { useTranslation } from "react-i18next";
import ThemeRoutes from "./routes";

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
