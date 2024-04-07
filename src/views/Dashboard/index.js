import { Box } from "@mui/material";
import React from "react";
import StatsticsCardsContainer from "./Components/StatsticsCardsContainer";

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
      </Box>
    </Box>
  );
};

export default Dashboard;
