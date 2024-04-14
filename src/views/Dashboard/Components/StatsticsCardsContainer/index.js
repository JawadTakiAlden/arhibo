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

const statsiticsCards = [
  {
    id: "users",
    title: "Number Of Accounts",
    icon: <PeopleOutlined />,
  },
  {
    id: "categories",
    title: "Number Of Catgeories",
    icon: CatgeoryIcon,
  },
  {
    id: "templates",
    title: "Number Of Templates",
    icon: TemplateIcon,
  },
  {
    id: "invitations",
    title: "Number Of Events",
    icon: <InsertInvitation />,
  },
  {
    id: "invitees",
    title: "Number of invitations issued",
    icon: <PeopleOutlined />,
  },
  {
    id: "number_of_coupons",
    title: "Number Of Coupons",
    icon: CouponIcon,
  },
  {
    id: "number_of_in_used_coupons",
    title: "Number of coupons used",
    icon: CouponIcon,
  },
  {
    id: "number_of_people_invited_by_app",
    title: "Number of people who received an invitation",
    icon: <PeopleOutlined />,
  },
];

const SttaistcCard = ({ cardInfo, title, icon }) => {
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

const StatsticsCardsContainer = () => {
  const statistics = useGetStatistics();

  if (statistics.isLoading) {
    return "loading ...";
  }

  if (statistics.isSuccess) {
    return (
      <Grid container rowSpacing={3} columnSpacing={2}>
        {statsiticsCards?.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
            <SttaistcCard
              title={card.title}
              icon={card.icon}
              cardInfo={statistics?.data?.data?.[card.id]}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default StatsticsCardsContainer;
