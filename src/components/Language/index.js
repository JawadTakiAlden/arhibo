import { MenuItem, Select, styled } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { setLocale } from "yup";
import { ar } from 'yup-locales';

const LanguageSwitcherSelect = styled(Select)(({ theme, fontcolor }) => ({
  color: fontcolor,
  borderRadius: "20px",
  "& .MuiSvgIcon-root": {
    color: fontcolor,
  },
}));

const LanguageSwitcher = ({ fontcolor = "#222" }) => {
  const { t, i18n } = useTranslation();
  return (
    <LanguageSwitcherSelect
      color="success"
      fontcolor={fontcolor}
      value={i18n.language}
      onChange={(e) => {
        document.dir = i18n.language === "ar" ? "ltr" : "rtl";
        i18n.changeLanguage(e.target.value);
        setLocale(ar)
      }}
    >
      <MenuItem value="en">{t("LanguageSwitcher.english")}</MenuItem>
      <MenuItem value="ar">{t("LanguageSwitcher.arabic")}</MenuItem>
    </LanguageSwitcherSelect>
  );
};

export default LanguageSwitcher;
