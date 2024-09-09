import {
  Box,
  Grid,
  IconButton,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React from "react";
import useGetStatistics from "../../../../api/statistics/useGetStatistics";
import ColoredWord from "../../../../components/ColoredWord";
import { InsertInvitation, PeopleOutlined } from "@mui/icons-material";
import {
  CatgeoryIcon,
  CouponIcon,
  TemplateIcon,
} from "../../../../assets/iconsExporter";
import { useTranslation } from "react-i18next";

const StatisticCard = ({ cardInfo, title, icon }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: `1px 1px 10px -6px ${alpha(theme.palette.success.main, 0.2)}`,
        minHeight: "100%",
        position: "relative",
        p: 4,
        color: "success.main",
        transition: "0.3s",
        textAlign: "center",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: `1px 1px 10px -6px ${alpha(theme.palette.success.main, 1)}`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <IconButton color="success" variant="contained">
          {icon}
        </IconButton>
      </Box>
      <Typography
        sx={{
          color: "",
          fontWeight: "600",
          fontSize: "16px",
          textTransform: "capitalize",
          mb: 1,
          zIndex: "10",
        }}
      >
        {title}
      </Typography>
      <Typography>
        <ColoredWord sx={{ fontSize: "25px" }} color="#222">
          {cardInfo}
        </ColoredWord>
      </Typography>
    </Box>
  );
};

const StatisticsCardsContainer = () => {
  const statistics = useGetStatistics();
  const { t } = useTranslation();
  const statisticsCards = [
    {
      id: "users",
      title: t("Home.number_of_accounts"),
      icon: <PeopleOutlined />,
    },
    {
      id: "categories",
      title: t("Home.number_of_categories"),
      icon: CatgeoryIcon,
    },
    {
      id: "templates",
      title: t("Home.number_of_template"),
      icon: TemplateIcon,
    },
    {
      id: "invitations",
      title: t("Home.number_of_events"),
      icon: <InsertInvitation />,
    },
    {
      id: "invitees",
      title: t("Home.number_of_invetation_issued"),
      icon: <PeopleOutlined />,
    },
    {
      id: "number_of_coupons",
      title: t("Home.number_of_coupons"),
      icon: CouponIcon,
    },
    {
      id: "number_of_people_invited_by_app",
      title: t("Home.number_of_people_who_recived_invation"),
      icon: <PeopleOutlined />,
    },
  ];

  if (statistics.isLoading) {
    return t("Shared.loading");
  }

  return (
    <Grid container rowSpacing={3} columnSpacing={2}>
      {statisticsCards?.map((card) => (
        <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
          <StatisticCard
            title={card.title}
            icon={card.icon}
            cardInfo={statistics?.data?.data?.[card.id]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsCardsContainer;
