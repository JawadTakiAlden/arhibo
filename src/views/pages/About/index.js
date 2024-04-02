import { Add, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React from "react";
import Search from "../../../components/Search";
import ColoredWord from "../../../components/ColoredWord";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetAbout from "../../../api/About/useGetAbout";

const AboutApp = () => {
    const theme = useTheme();
    const { t , i18n } = useTranslation();
    const aboutApp = useGetAbout()

    if(aboutApp.isLoading){
      return "loading ..."
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
            color="darkBlue"
            variant="contained"
            to={"/dashboard/about/create"}
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
          {aboutApp?.data?.data?.map((about) => (
              <Box
              key={about.id}
                component={Link}
                to={`/dashboard/about/${about.id}`}
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
                    {t('title')}
                  </ColoredWord>
                  <Typography>
                    {i18n.language === 'ar' ? about.title_ar : about.title}
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
                     {t('description')}
                  </ColoredWord>
                  <Typography>
                  {i18n.language === 'ar' ? about.body_ar : about.body}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    );
}

export default AboutApp