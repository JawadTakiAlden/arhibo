import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { EditOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import DeleteButton from "./components/DeleteButton";
import useUpdatePloicy from "../../../../api/Policy/useUpdatePolicy";
import useShowPolicy from "../../../../api/Policy/useShowPolicy";
const ShowPolicy = () => {
  const { t } = useTranslation();
  const udatePolicy = useUpdatePloicy();
  const policyInfo = useShowPolicy()
  const handelCreate = (values) => {
    udatePolicy.mutate(values);
  };

  if(policyInfo.isLoading){
    return "loading ..."
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
            title_ar: yup
              .string()
              
              .required(t("PolicyForms.title_ar_val")),
              title: yup
              .string()
              
              .required(t("PolicyForms.title_en_val")),
              body_ar: yup
              .string()
              
              .required(t("PolicyForms.description_ar_val")),
              body: yup
              .string()
              
              .required(t("PolicyForms.description_en_val")),
          })}
          initialValues={{
            title_ar: policyInfo?.data?.data?.title_ar,
            title: policyInfo?.data?.data?.title,
            body_ar: policyInfo?.data?.data?.body_ar,
            body: policyInfo?.data?.data?.body,
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
                <InputLabel>{t("PolicyForms.title_ar")}</InputLabel>
                <OutlinedInput
                  label={t("PolicyForms.title_ar")}
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
                <InputLabel>{t("PolicyForms.title_en")}</InputLabel>
                <OutlinedInput
                  label={t("PolicyForms.title_en")}
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
                <InputLabel>{t("PolicyForms.description_ar")}</InputLabel>
                <OutlinedInput
                  label={t("PolicyForms.description_ar")}
                  name="body_ar"
                  value={values.body_ar}
                  multiline
                  minRows={4}
                  maxRows={6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.body_ar && touched.body_ar}
                />
                {errors.body_ar && touched.body_ar && (
                  <FormHelperText error>{errors.body_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("PolicyForms.description_en")}</InputLabel>
                <OutlinedInput
                  label={t("PolicyForms.description_en")}
                  name="body"
                  value={values.body}
                  onChange={handleChange}
                  multiline
                  minRows={4}
                  maxRows={6}
                  onBlur={handleBlur}
                  error={errors.body && touched.body}
                />
                {errors.body && touched.body && (
                  <FormHelperText error>{errors.body}</FormHelperText>
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
                  variant="contained"
                  type="submit"
                  loading={udatePolicy.isPending}
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

export default ShowPolicy;
