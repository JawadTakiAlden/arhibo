import { DownloadOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useUpdatePackage from "../../../../api/Packages/useUpdatePackage";
import useShowPackage from "../../../../api/Packages/useShowPackage";
import DeleteButton from "./components/DeleteButton";
import { Link } from "react-router-dom";

const ShowPackage = () => {
  const { t } = useTranslation();
  const updatePackage = useUpdatePackage();
  const packageInfo = useShowPackage();
  const handelCreate = (values) => {
    updatePackage.mutate(values);
  };

  if (packageInfo.isLoading) {
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
          onSubmit={handelCreate}
          validationSchema={yup.object({
            name_ar: yup.string().required(),
            name: yup.string().required(),
            description_ar: yup.string().required(),
            description: yup.string().required(),
          })}
          initialValues={{
            name_ar: packageInfo?.data?.data?.name_ar,
            name: packageInfo?.data?.data?.name,
            description_ar: packageInfo?.data?.data?.description_ar,
            description: packageInfo?.data?.data?.description,
            color: packageInfo?.data?.data?.color,
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("CreatePackage.name_ar")}</InputLabel>
                <OutlinedInput
                  label={t("CreatePackage.name_ar")}
                  name="name_ar"
                  onChange={handleChange}
                  value={values.name_ar}
                  onBlur={handleBlur}
                  error={errors.name_ar && touched.name_ar}
                />
                {errors.name_ar && touched.name_ar && (
                  <FormHelperText error>{errors.name_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("CreatePackage.name_en")}</InputLabel>
                <OutlinedInput
                  label={t("CreatePackage.name_en")}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name && touched.name}
                />
                {errors.name && touched.name && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("CreatePackage.description_ar")}</InputLabel>
                <OutlinedInput
                  label={t("CreatePackage.description_ar")}
                  name="description_ar"
                  multiline
                  minRows={4}
                  maxRows={6}
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
                <InputLabel>{t("CreatePackage.description_en")}</InputLabel>
                <OutlinedInput
                  label={t("CreatePackage.description_en")}
                  name="description"
                  multiline
                  minRows={4}
                  maxRows={6}
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
                <InputLabel>{t("CreatePackage.color")}</InputLabel>
                <OutlinedInput
                  label={t("CreatePackage.color")}
                  name="color"
                  value={values.color}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.color && touched.color}
                />
                {errors.color && touched.color && (
                  <FormHelperText error>{errors.color}</FormHelperText>
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
                  loading={updatePackage.isPending}
                  sx={{
                    flexBasis: "50%",
                  }}
                  type="submit"
                  startIcon={<DownloadOutlined fontSize="medium" />}
                >
                  {t("edit")}
                </LoadingButton>
                <DeleteButton />
              </Box>
              <Button
                component={Link}
                to={`/dashboard/packages/${packageInfo?.data?.data?.id}/details`}
                sx={{ mt: 1 }}
                color="success"
                variant="contained"
                fullWidth
              >
                {t("CreatePackage.packageDaitalsBtn")}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ShowPackage;
