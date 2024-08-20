import React from "react";
import useGetPackages from "../../../api/Packages/useGetPackages";
import { Box, Button, Grid } from "@mui/material";
import PackageCard from "./PackageCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PackagesList = () => {
  const { t } = useTranslation();
  const packages = useGetPackages();
  if (packages.isLoading) {
    return t('Shared.loading');
  }
  
  return (
    <Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Button
          component={Link}
          to={"/dashboard/packages/create"}
          color="darkBlue"
          variant="contained"
        >
          {t("add_new")}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {packages?.data?.data?.map((pa) => (
          <Grid component={Link} sx={{color : 'inherit' , textDecoration : 'none'}} to={`/dashboard/packages/${pa.id}`} item key={pa.id} xs={12} md={6} lg={4}>
            <PackageCard packageInfo={pa} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PackagesList;
