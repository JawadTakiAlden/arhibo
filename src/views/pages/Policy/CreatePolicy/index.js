import {
    Box, FormControl, FormHelperText, InputLabel, OutlinedInput,
  } from "@mui/material";
  import React from "react";
  import { Formik } from "formik";
  import * as yup from 'yup'
  import { LoadingButton } from "@mui/lab";
  import { DownloadOutlined } from "@mui/icons-material";
  import { useTranslation } from "react-i18next";
import useCreatePloicy from "../../../../api/Policy/useCreatePloicy";
const CreatePolicy = () => {
    const {t} = useTranslation()
    const createPolicy = useCreatePloicy()
    const handelCreate = (values) => {
      createPolicy.mutate(values)
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
            title_ar : yup.string().max(255).required(t('TermForms.title_ar_val')),
            title : yup.string().max(255).required(t('TermForms.title_en_val')),
            body_ar: yup.string().max(255).required(t('TermForms.description_ar_val')),
            body: yup.string().max(255).required(t('TermForms.description_en_val')),
        })}
          initialValues={{
            title_ar : "",
            title : "",
            body_ar: "",
            body: "",
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
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('TermForms.title_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('TermForms.title_ar')}
                    name="title_ar"
                    onChange={handleChange}
                    value={values.title_ar}
                    onBlur={handleBlur}
                    error={errors.title_ar && touched.title_ar}
                />
                {
                    errors.title_ar && touched.title_ar && <FormHelperText error>
                        {errors.title_ar}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('TermForms.title_en')}</InputLabel>
                <OutlinedInput 
                    label={t('TermForms.title_en')}
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title && touched.title}
                />
                {
                    errors.title && touched.title && <FormHelperText error>
                        {errors.title}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('TermForms.description_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('TermForms.description_ar')}
                    name="body_ar"
                    value={values.body_ar}
                    inputComponent={'textarea'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.body_ar && touched.body_ar}
                />
                {
                    errors.body_ar && touched.body_ar && <FormHelperText error>
                        {errors.body_ar}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('TermForms.description_en')}</InputLabel>
                <OutlinedInput 
                    label={t('TermForms.description_en')}
                    name="body"
                    value={values.body}
                    onChange={handleChange}
                    inputComponent={'textarea'}
                    onBlur={handleBlur}
                    error={errors.body && touched.body}
                />
                {
                    errors.body && touched.body && <FormHelperText error>
                        {errors.body}
                    </FormHelperText>
                }
              </FormControl>
              <LoadingButton
                color="darkBlue"
                fullWidth
                variant="contained"
                type="submit"
                loading={createPolicy.isPending}
                startIcon={<DownloadOutlined fontSize="medium" />}
              >
                {t('add')}
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default CreatePolicy