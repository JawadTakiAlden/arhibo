import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import ColoredWord from "../../../components/ColoredWord";
import { useTranslation } from "react-i18next";
import AddButton from "./components/AddButton";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";
import useGetSecondaryPackage from "../../../api/SecondaryPackages/useGetSecondaryPackage";

const SecondaryPackageCard = ({secondaryPackage}) => {
  const theme = useTheme();
  const {t} = useTranslation()
  return (
    <Box
      sx={{
        boxShadow: "1px 1px 10px -6px rgba(0,0,0,.4)",
        borderRadius: "12px",
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Box
        sx={{
            flex : 1
        }}
      >
        <Typography>
          <ColoredWord
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            color={theme.palette.success.dark}
          >
            {t('SecondaryPackage.number_of_people')} :
          </ColoredWord>{" "}
          {secondaryPackage.number_of_invitees}
        </Typography>

        <Typography>
          <ColoredWord
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            color={theme.palette.success.dark}
          >
            {t('SecondaryPackage.price')} :
          </ColoredWord>{" "}
          {secondaryPackage.price} {t('Shared.sr')}
        </Typography>
      </Box>
      <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            gap : '5px',
            flexDirection : 'column'
        }}
      >
        <EditButton secondaryPackage={secondaryPackage} />
        <DeleteButton packageSecondaryId={secondaryPackage.id} />
      </Box>
    </Box>
  );
};

const SecondaryPackages = () => {
  const { t } = useTranslation();
  const secondaryPaclages = useGetSecondaryPackage()
  if(secondaryPaclages.isLoading){
    return t('Shared.loading')
  }
  return (
    <Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <AddButton />
      </Box>
      <Grid container spacing={1}>
        {secondaryPaclages?.data?.data?.map((secondaryPackage) => {
            return (
              <Grid key={secondaryPackage?.id} item xs={12} sm={6} md={3}>
                <SecondaryPackageCard secondaryPackage={secondaryPackage} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default SecondaryPackages;
