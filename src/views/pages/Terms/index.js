import { Add, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  InputAdornment,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React from "react";
import Button from "../../../components/Button";
import Search from "../../../components/Search";
import ColoredWord from "../../../components/ColoredWord";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetTerms from "../../../api/Terms/useGetTerms";
const AllTerms = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const terms = useGetTerms();

  if (terms.isLoading) {
    return "loading ...";
  }


  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "15px",
          mb: 2,
        }}
      >
        <Button
          component={Link}
          to={"/dashboard/terms/create"}
          endIcon={<Add />}
          size="medium"
        >
          {t("add_new")}
        </Button>
        <Search
          placeholder={t("search")}
          color="success"
          endAdornment={
            <InputAdornment position="end">
              <SearchOutlined />
            </InputAdornment>
          }
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {terms?.data?.data.map((term) => (
          <Box
            component={Link}
            to={`/dashboard/terms/${term.id}`}
            sx={{
              boxShadow: `0px 4px 30px 0px ${alpha(theme.palette.common.black, 0.1)}`,
              borderRadius: "12px",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              sx={{
                p: 3,
              }}
            >
              <ColoredWord
                sx={{
                  mb: 2,
                }}
                color={theme.palette.success.main}
              >
                {t("title")} :
              </ColoredWord>
              <Typography>
                {i18n.language === "ar" ? term.title_ar : term.title}
              </Typography>
            </Box>

            <Divider sx={{}} />
            <Box
              sx={{
                p: 3,
              }}
            >
              <ColoredWord
                sx={{
                  mb: 2,
                }}
                color={theme.palette.success.main}
              >
                {t("description")}
              </ColoredWord>
              <Typography>
                {i18n.language === "ar" ? term.body_ar : term.body}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AllTerms;
