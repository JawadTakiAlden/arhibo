import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import FileInput from "../../../../components/FileInput";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { DownloadOutlined, EditOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useShowTemplate from "../../../../api/Template/useShowTemplate";
import useGetAllCategories from "../../../../api/Category/useGetAllCategories";
import useUpdateTemplate from "../../../../api/Template/useUpdateTemplate";
import DeleteButton from "./components/DeleteButton";
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
      category_id: values.category_id.id,
      filter_id: values.filter_id.id,
    };
    updateTemplate.mutate(values);
  };

  const categories = useGetAllCategories();
  const filters = useGetAllFilters();

  if (template.isLoading) {
    return t("Shared.loading");
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
            template_code: template?.data?.data?.template_code,
          }}
          validationSchema={yup.object({
            title_ar: yup
              .string()

              .required(),
            title: yup
              .string()

              .required(),
            description_ar: yup
              .string()

              .required(),
            description: yup
              .string()

              .required(),
            category_id: yup.mixed().required(),
            filter_id: yup.mixed().required(),
            emoji: yup.string().required(),
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
                      label={t("TemplateForms.category")}
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
                      label={t("TemplateForms.filter")}
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
                <InputLabel>Template Code</InputLabel>
                <OutlinedInput
                  label={"Template Code"}
                  name="template_code"
                  onChange={handleChange}
                  value={values.template_code}
                  onBlur={handleBlur}
                  error={errors.template_code && touched.template_code}
                />
                {errors.template_code && touched.template_code && (
                  <FormHelperText error>{errors.template_code}</FormHelperText>
                )}
              </FormControl>
              {/*
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
                <InputLabel>{t("TemplateForms.emoji")}</InputLabel>
                <OutlinedInput
                  label={t("TemplateForms.emoji")}
                  name="emoji"
                  value={values.emoji}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.emoji && touched.emoji}
                />
                {errors.emoji && touched.emoji && (
                  <FormHelperText error>{errors.emoji}</FormHelperText>
                )}
              </FormControl> */}

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
                  startIcon={<EditOutlined fontSize="medium" />}
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
