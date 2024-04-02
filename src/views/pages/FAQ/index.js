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
import useGetFaqs from "../../../api/FAQ/useGetFaqs";
const AllFaq = () => {
  const theme = useTheme();
  const faqs = useGetFaqs()
  const { t  , i18n} = useTranslation();


  if(faqs.isLoading){
    return "loading"
  }

  console.log(faqs?.data?.data)
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
          to={"/dashboard/faqs/create"}
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
        {faqs?.data?.data?.map((faq) => (
            <Box
            key={faq.id}
              component={Link}
              to={`/dashboard/faqs/${faq.id}`}
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
                  {t('question')}
                </ColoredWord>
                <Typography>
                  {i18n.language === 'ar' ? faq.question_ar : faq.question}
                </Typography>
              </Box>

              <Divider  />
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
                   {t('answer')}
                </ColoredWord>
                <Typography>
                {i18n.language === 'ar' ? faq.answer_ar : faq.answer}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default AllFaq