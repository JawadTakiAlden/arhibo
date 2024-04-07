import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FileInput from "../../../../components/FileInput";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import {
  DownloadOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useShowTemplate from "../../../../api/Template/useShowTemplate";
import useGetAllCategories from "../../../../api/Category/useGetAllCategories";
import useGetFiltersOfCategory from "../../../../api/Category/useGetFiltersOfCategory";
import useUpdateTemplate from "../../../../api/Template/useUpdateTemplate";
import DeleteButton from "./components/DeleteButton";
import useGetCatgeoryWithFilters from "../../../../api/Category/useGetCatgeoryWithFilters";
import useGetAllFilters from "../../../../api/Filters/useGetAllFilters";

const ShowTemplate = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
 
  const { t } = useTranslation();

  const template = useShowTemplate();
  const updateTemplate = useUpdateTemplate();
  const handelUpdate = (values) => {
    values = {
      ...values,
      category_id : values.category_id.id,
      filter_id : values.filter_id.id
    }
    updateTemplate.mutate(values);
  };

  const categories = useGetAllCategories();
  const filters = useGetAllFilters();

  if (template.isLoading) {
    return "loading ...";
  }


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "60%" },
        }}
      >
        <Formik
          initialValues={{
            title_ar: template?.data?.data?.title_ar,
            title: template?.data?.data?.title,
            description_ar: template?.data?.data?.description_ar,
            description: template?.data?.data?.description,
            category_id: template?.data?.data?.category,
            filter_id: template?.data?.data?.filters[0],
            emoji: template?.data?.data?.emoji,
          }}
          validationSchema={yup.object({
            title_ar: yup
              .string()
              .max(255)
              .required(t("TemplateForms.title_ar_val")),
            title: yup
              .string()
              .max(255)
              .required(t("TemplateForms.title_en_val")),
            description_ar: yup
              .string()
              .max(255)
              .required(t("TemplateForms.description_ar_val")),
            description: yup
              .string()
              .max(255)
              .required(t("TemplateForms.description_en_val")),
            category_id: yup.mixed().required(t("TemplateForms.category_val")),
            filter_id: yup.mixed().required(t("TemplateForms.category_val")),
            emoji: yup.string().required("emoje is required"),
          })}
          onSubmit={handelUpdate}
        >
          {({
            handleSubmit,
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <FileInput
                handelBlur={handleBlur}
                values={values}
                setFieldValue={setFieldValue}
              />
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <Autocomplete
                  open={categoryOpen}
                  onOpen={() => {
                    setCategoryOpen(true);
                  }}
                  onClose={() => {
                    setCategoryOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, nv) => {
                    setFieldValue("category_id", nv);
                  }}
                  defaultValue={values.category_id}
                  getOptionLabel={(option) => option.name}
                  options={categories?.data?.data || []}
                  loading={categories.isLoading}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {categories.isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <Autocomplete
                  open={filterOpen}
                  onOpen={() => {
                    setFilterOpen(true);
                  }}
                  onClose={() => {
                    setFilterOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, nv) => {
                    setFieldValue("filter_id", nv);
                  }}
                  getOptionLabel={(option) => option.name}
                  options={filters?.data?.data || []}
                  loading={filters.isLoading}
                  defaultValue={values.filter_id}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {filters.isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("TemplateForms.title_ar")}</InputLabel>
                <OutlinedInput
                  label={t("TemplateForms.title_ar")}
                  name="title_ar"
                  onChange={handleChange}
                  value={values.title_ar}
                  onBlur={handleBlur}
                  error={errors.title_ar && touched.title_ar}
                />
                {errors.title_ar && touched.title_ar && (
                  <FormHelperText error>{errors.title_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("TemplateForms.title_en")}</InputLabel>
                <OutlinedInput
                  label={t("TemplateForms.title_en")}
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.title && touched.title}
                />
                {errors.title && touched.title && (
                  <FormHelperText error>{errors.title}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("TemplateForms.description_ar")}</InputLabel>
                <OutlinedInput
                  label={t("TemplateForms.description_ar")}
                  name="description_ar"
                  value={values.description_ar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.description_ar && touched.description_ar}
                />
                {errors.description_ar && touched.description_ar && (
                  <FormHelperText error>{errors.description_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("TemplateForms.description_en")}</InputLabel>
                <OutlinedInput
                  label={t("TemplateForms.description_en")}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.description && touched.description}
                />
                {errors.description && touched.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("TemplateForms.description_en")}</InputLabel>
                <OutlinedInput
                  label={t("TemplateForms.description_en")}
                  name="emoji"
                  value={values.emoji}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.emoji && touched.emoji}
                />
                {errors.emoji && touched.emoji && (
                  <FormHelperText error>{errors.emoji}</FormHelperText>
                )}
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <LoadingButton
                  color="darkBlue"
                  fullWidth
                  variant="contained"
                  type="submit"
                  loading={updateTemplate.isPending}
                  sx={{
                    flexBasis: "50%",
                  }}
                  startIcon={<DownloadOutlined fontSize="medium" />}
                >
                  {t("edit")}
                </LoadingButton>
                <DeleteButton />
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ShowTemplate;
