import { Add, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Search from "../../../components/Search";
import CategoryCradImage from "../../../assets/images/category-card.png";
import ColoredWord from "../../../components/ColoredWord";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetTemplates from "../../../api/Template/useGetTemplates";
import useDebounce from "../../../utils/useDebounce";
import TemproryLoader from "../../../components/TemproryLoader";
import InViewImage from "../../../components/InViewImage";

const AllTemplate = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const templates = useGetTemplates(search);
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(2);

  const handelRefetchOnSearch = useDebounce(() => {
    templates.refetch();
  }, 500);

  useEffect(() => {
    handelRefetchOnSearch();
  }, [search]);

  if (templates.isLoading) {
    return t("Shared.loading");
  }

  const totalPages = Math.floor(templates?.data?.data?.length / 12);
  const startIndex = page * 12;
  const endIndex = startIndex + 12;
  const currentPageElements = templates?.data?.data?.slice(
    startIndex,
    endIndex
  );

  console.log(totalPages, startIndex, endIndex, currentPageElements);

  return (
    <Box>
      <TemproryLoader loading={templates.isRefetching} />
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
          to={"/dashboard/templates/create"}
          endIcon={<Add />}
          size="medium"
        >
          {t("add_new")}
        </Button>
        <Search
          placeholder={t("search")}
          color="success"
          onChange={(e) => {
            setSearch(e.target.value);
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
        {currentPageElements?.map((template) => (
          <Card
            key={template.id}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 4px 30px 0px #0000001A",
              textDecoration: "none",
            }}
            component={Link}
            to={`/dashboard/templates/${template.id}`}
          >
            <CardMedia
              // component={InViewImage}
              height="180"
              width="200"
              // loading="lazy"
              // image={template.image}
              // src={template.image}
            >
              <InViewImage
                style={{ width: "100%" }}
                src={template.image}
                alt={template.id}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <ColoredWord sx={{ fontWeight: "600" }}>
                  {t("AllTemplates.emojy")}
                </ColoredWord>{" "}
                : {template.emoji}
              </Typography>
              <Typography variant="h5">
                <ColoredWord sx={{ fontWeight: "600" }}>
                  {t("AllTemplates.title")}
                </ColoredWord>{" "}
                :{i18n.language === "ar" ? template.title_ar : template.title}
              </Typography>
              <Typography variant="h5">
                <ColoredWord sx={{ fontWeight: "600" }}>
                  {t("AllTemplates.description")}
                </ColoredWord>{" "}
                :
                {i18n.language === "ar"
                  ? template.description_ar
                  : template.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                backgroundColor: theme.palette.darkBlue.main,
                color: theme.palette.common.white,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {template.template_code}
            </CardActions>
          </Card>
        ))}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {Array(totalPages).fill(1).map((p , i) => {
            return <Typography sx={{
              backgroundColor : i === page ? 'success.main' : undefined,
              border : (theme) => i !== page ? `1px solid ${theme.palette.success.main}` : undefined,
              p : 0.5,
              borderRadius : '4px',
              color : i === page ? 'common.white' : 'grey.500',
              width  :'40px',
              cursor : 'pointer',
              flexShrink : 0,
              height : '40px',
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'center',
              transition : '0.3s',
            }}
            onClick={() => {
              setPage(i)
            }}
            >{i * 12}</Typography>;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default AllTemplate;
