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
import React from "react";
import Button from "../../../components/Button";
import Search from "../../../components/Search";
import CategoryCradImage from "../../../assets/images/category-card.png";
import ColoredWord from "../../../components/ColoredWord";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetTemplates from "../../../api/Template/useGetTemplates";


const AllTemplate = () => {
  const theme = useTheme()
  const templates = useGetTemplates()
  const {t , i18n} = useTranslation()


  if(templates.isLoading){
    return "loading ..."
  }

  console.log(templates?.data?.data)
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
        <Button component={Link} to={'/dashboard/templates/create'} endIcon={<Add />} size="medium">
          {t('add_new')}
        </Button>
        <Search
          placeholder={t('search')}
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
            display : 'grid',
            gridTemplateColumns : 'repeat(auto-fill, minmax(200px, 1fr))',
            gap : '20px'
        }}
      >
        {
            templates?.data?.data.map((template) => (
                <Card
                    sx={{
                    borderRadius: "12px",
                    boxShadow: "0px 4px 30px 0px #0000001A",
                    textDecoration : 'none'
                    }}
                    component={Link}
                    to={`/dashboard/templates/${template.id}`}
                >
                    <CardMedia
                    component="img"
                    height="180"
                    image={template.image}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <ColoredWord sx={{ fontWeight: "600" }}>Emoji</ColoredWord> : {template.emoji}
                    </Typography>
                    <Typography variant="h5">
                        <ColoredWord sx={{ fontWeight: "600" }}>{t('title')}</ColoredWord> :
                         {i18n.language === 'ar' ? template.title_ar : template.title}
                    </Typography>
                    <Typography variant="h5">
                        <ColoredWord sx={{ fontWeight: "600" }}>{t('description')}</ColoredWord> :
                        {i18n.language === 'ar' ? template.description_ar : template.description}
                    </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        backgroundColor : theme.palette.darkBlue.main,
                        color : theme.palette.common.white,
                        alignItems : 'center',
                        justifyContent : 'center'
                      }}
                    >
                      {template.template_code}
                    </CardActions>
                </Card>
            ))
        }
      </Box>
    </Box>
  );
}

export default AllTemplate