import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import FileInput from "../../../../components/FileInput";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { EditOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import DeleteButton from "./components/DeleteButton";
import useUpdateService from "../../../../api/Services/useUpdateService";
import useShowService from "../../../../api/Services/useShowService";


const ShowService = () => {
  const { t } = useTranslation();
  const updateService = useUpdateService()
  const serviceInfo = useShowService()
  const handelCreate = (values) => {
    updateService.mutate(values)
  };

  if(serviceInfo.isLoading){
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
              .max(255)
              .required(t("ServiceForms.title_ar_val")),
            title: yup
              .string()
              .max(255)
              .required(t("ServiceForms.title_en_val")),
              body_ar: yup
              .string()
              .max(255)
              .required(t("ServiceForms.description_ar_val")),
              body: yup
              .string()
              .max(255)
              .required(t("ServiceForms.description_en_val")),
            image: yup.mixed().required(t("ServiceForms.image_val")),
          })}
          initialValues={{
            title_ar: serviceInfo?.data?.data?.title_ar,
            title: serviceInfo?.data?.data?.title,
            body_ar: serviceInfo?.data?.data?.body_ar,
            body: serviceInfo?.data?.data?.body,
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <FileInput
                handelBlur={handleBlur}
                values={values}
                setFieldValue={setFieldValue}
              />
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("ServiceForms.title_ar")}</InputLabel>
                <OutlinedInput
                  label={t("ServiceForms.title_ar")}
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
                <InputLabel>{t("ServiceForms.title_en")}</InputLabel>
                <OutlinedInput
                  label={t("ServiceForms.title_en")}
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
                <InputLabel>{t("ServiceForms.description_ar")}</InputLabel>
                <OutlinedInput
                  label={t("ServiceForms.description_ar")}
                  name="body_ar"
                  value={values.body_ar}
                  onChange={handleChange}
                  inputComponent={'textarea'}
                  onBlur={handleBlur}
                  error={errors.body_ar && touched.body_ar}
                />
                {errors.body_ar && touched.body_ar && (
                  <FormHelperText error>{errors.body_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("ServiceForms.description_en")}</InputLabel>
                <OutlinedInput
                  label={t("ServiceForms.description_en")}
                  name="body"
                  value={values.body}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputComponent={'textarea'}
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
                  loading={updateService.isPending}
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

export default ShowService;
