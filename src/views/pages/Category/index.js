import { Add, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Search from "../../../components/Search";
import ColoredWord from "../../../components/ColoredWord";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetAllCategories from "../../../api/Category/useGetAllCategories";
import useDebounce from "../../../utils/useDebounce";
import TemproryLoader from "../../../components/TemproryLoader";

const AllCatgeory = () => {
  const { t, i18n } = useTranslation();
  const [search , setSearch] = useState('')
  const catgeoire = useGetAllCategories(search);

  const handelRefetchOnSearch = useDebounce(() => {
    catgeoire.refetch();
  }, 500);

  useEffect(() => {
    handelRefetchOnSearch()
  } , [search])

  if(catgeoire.isLoading){
    return "loading ..."
  }

  return (
    <Box>
      <TemproryLoader loading={catgeoire.isRefetching} />
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
          to={"/dashboard/categories/create"}
          endIcon={<Add />}
          size="medium"
        >
          {t("add_new")}
        </Button>
        <Search
          placeholder={t("add_new")}
          color="success"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          value={search}
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
        {catgeoire?.data?.data?.map((catgeoyr) => (
          <Card
            key={catgeoyr.id}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 4px 30px 0px #0000001A",
              textDecoration: "none",
            }}
            component={Link}
            to={`/dashboard/categories/${catgeoyr?.id}`}
          >
            <CardMedia component="img" height="180" image={catgeoyr?.image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <ColoredWord sx={{ fontWeight: "600" }}>
                  {" "}
                  {t("name")}
                </ColoredWord>{" "}
                : {i18n.language === "ar" ? catgeoyr.name_ar : catgeoyr.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AllCatgeory;
