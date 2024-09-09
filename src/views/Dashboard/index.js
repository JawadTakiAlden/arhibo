import { Box } from "@mui/material";
import React from "react";
import StatsticsCardsContainer from "./Components/StatsticsCardsContainer";
import PushNotification from "./Components/PushNotification";

const Dashboard = () => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <StatsticsCardsContainer />
        <PushNotification />
      </Box>
    </Box>
  );
};

export default Dashboard;
