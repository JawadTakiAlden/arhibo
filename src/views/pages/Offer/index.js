import React from "react";
import useGetOffers from "../../../api/Offer/useGetOffers";
import { Box } from "@mui/material";
import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import InViewImage from "../../../components/InViewImage";

const OfferList = () => {
  const offers = useGetOffers();
  const { t } = useTranslation();

  if (offers.isLoading) {
    return t("Shared.loading");
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
        <AddButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {offers?.data?.data?.map((offer) => (
          <Box
            key={offer.id}
            sx={{
              position: "relative",
              width: {
                xs: "100%",
                sm: "calc(50% - 5px)",
                md: "calc(33.33% - 5px)",
                lg: "calc(25% - 5px)",
              },
              borderRadius: "8px",
              boxShadow: "0px 0px 10px -5px rgba(0,0,0,.2)",
              height: "200px",
              overflow: "hidden",
              "&:hover > img": {
                filter: "blur(20px)",
              },
              "&:hover > .MuiIconButton-root": {
                opacity: "1",
              },
            }}
          >
            <InViewImage
              src={offer.image}
              alt={`offer ${offer.id}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                zIndex: 1,
                objectFit: "fill",
                transition: "0.3s",
              }}
            />
            <DeleteButton row={offer} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OfferList;
