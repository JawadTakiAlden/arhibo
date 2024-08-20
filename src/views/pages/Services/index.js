import { Add, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
  Typography,
} from "@mui/material";
import React from "react";
import Button from "../../../components/Button";
import Search from "../../../components/Search";
import ColoredWord from "../../../components/ColoredWord";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetServices from "../../../api/Services/useGetServices";
import InViewImage from "../../../components/InViewImage";

const AllServices = () => {
  const { t , i18n} = useTranslation();
  const services = useGetServices();

  if (services.isLoading) {
    return t('Shared.loading')
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
          to={"/dashboard/services/create"}
          endIcon={<Add />}
          size="medium"
        >
          {t("add_new")}
        </Button>
        <Search
          placeholder={t("add_new")}
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
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {services?.data?.data.map((service) => (
          <Card
            key={service.id}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 4px 30px 0px #0000001A",
              textDecoration: "none",
            }}
            component={Link}
            to={`/dashboard/services/${service.id}`}
          >
            <CardMedia  height="180">
              <InViewImage 
                src={service.image}
                alt={service.id}
                style={{
                  width : '100%'
                }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <ColoredWord sx={{ fontWeight: "600" }}>
                  {t("title")} : 
                </ColoredWord>{" "}
                {i18n.language === 'ar' ? service.title_ar : service.title}
              </Typography>
              <Typography variant="body2">
                <ColoredWord sx={{ fontWeight: "600" }}>
                  {t("description")} : 
                </ColoredWord>{" "}
                {i18n.language === 'ar' ? service.body_ar : service.body}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AllServices;
