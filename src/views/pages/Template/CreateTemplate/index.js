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
import { useFormik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { CreateOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useGetAllCategories from "../../../../api/Category/useGetAllCategories";
import useGetFiltersOfCategory from "../../../../api/Category/useGetFiltersOfCategory";
import useCreateTemplate from "../../../../api/Template/useCreateTemplate";

const CreateTemplate = () => {
  const { t } = useTranslation();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const createTemplate = useCreateTemplate();
  const handelCreate = (values) => {
    values = {
      ...values,
      category_id: values.category_id.id,
      filter_id: values.filter_id ? values.filter_id?.id : null,
    };
    createTemplate.mutate(values);
  };
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema: yup.object({
      // title_ar: yup.string().required(),
      // title: yup.string().required(),
      // description_ar: yup
      //   .string()
      //   .required(),
      // description: yup
      //   .string()
      //   .required(),
      category_id: yup.mixed().required(),
      image: yup.mixed().required(),
      filter_id: yup.mixed(),
      template_code : yup.string()
      // emoji: yup.string().nullable(),
    }),

    initialValues: {
      // title_ar: "",
      // title: "",
      // description_ar: "",
      // description: "",
      template_code : "",
      category_id: "",
      filter_id: "",
      // emoji: "",
      image: "",
    },
    onSubmit: handelCreate,
  });

  const categories = useGetAllCategories();
  const filters = useGetFiltersOfCategory(values.category_id.id);

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
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, nv) => {
                setFieldValue("category_id", nv);
              }}
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
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, nv) => {
                setFieldValue("filter_id", nv);
              }}
              getOptionLabel={(option) => option.name}
              options={filters?.data?.data || []}
              loading={filters.isLoading}
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
          </FormControl> */}
          {/* <FormControl color="success" fullWidth sx={{ mb: 1 }}>
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
          <LoadingButton
            color="darkBlue"
            fullWidth
            variant="contained"
            type="submit"
            loading={createTemplate.isPending}
            startIcon={<CreateOutlined fontSize="medium" />}
          >
            {t("add")}
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
};

export default CreateTemplate;
