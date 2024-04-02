import { DownloadOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useCreatePrihibited from "../../../../api/Prihibited/useCreatePrihibited";

const CreatePrihibited = () => {
  const { t } = useTranslation();
  const createPrihibited = useCreatePrihibited();
  const handelCreate = (values) => {
    createPrihibited.mutate(values);
  };
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
            name: yup.string().required("name is required"),
            name_ar: yup.string().required("arabic name is required"),
          })}
          initialValues={{
            name: "",
            name_ar: "",
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
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  label={"Name"}
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  error={errors.name && touched.name}
                />
                {errors.name && touched.name && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>Arabic name</InputLabel>
                <OutlinedInput
                  label="Arabic name"
                  name="name_ar"
                  value={values.name_ar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name_ar && touched.name_ar}
                />
                {errors.name_ar && touched.name_ar && (
                  <FormHelperText error>{errors.name_ar}</FormHelperText>
                )}
              </FormControl>
              <LoadingButton
                color="darkBlue"
                fullWidth
                variant="contained"
                type="submit"
                loading={createPrihibited.isPending}
                startIcon={<DownloadOutlined fontSize="medium" />}
              >
                {t("add")}
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreatePrihibited;
