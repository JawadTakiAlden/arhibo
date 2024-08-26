import {
    Box, FormControl, FormHelperText, InputLabel, OutlinedInput,
  } from "@mui/material";
  import React from "react";
  import FileInput from "../../../../components/FileInput";
  import { Formik } from "formik";
  import * as yup from 'yup'
  import { LoadingButton } from "@mui/lab";
  import { CreateOutlined, DownloadOutlined } from "@mui/icons-material";
  import { useTranslation } from "react-i18next";
import useCreateService from "../../../../api/Services/useCreateService";
  
const CreateService = () => {
    const {t} = useTranslation()
    const createService = useCreateService()
    const handelCreate = (values) => {
      createService.mutate(values)
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
            title_ar : yup.string().required(),
            title : yup.string().required(),
            body: yup.string().required(),
            body_ar: yup.string().required(),
            image : yup.mixed().required()
        })}
          initialValues={{
            title_ar : "",
            title : "",
            body: "",
            body_ar: "",
            image : ""
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
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('ServiceForms.title_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('ServiceForms.title_ar')}
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
                <InputLabel>{t('ServiceForms.title_en')}</InputLabel>
                <OutlinedInput 
                    label={t('ServiceForms.title_en')}
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
                <InputLabel>{t('ServiceForms.description_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('ServiceForms.description_ar')}
                    name="body_ar"
                    value={values.body_ar}
                    multiline
                    minRows={4}
                    maxRows={6}
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
                <InputLabel>{t('ServiceForms.description_en')}</InputLabel>
                <OutlinedInput 
                    label={t('ServiceForms.description_en')}
                    name="body"
                    value={values.body}
                    multiline
                    minRows={4}
                    maxRows={6}
                    onChange={handleChange}
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
                loading={createService.isPending}
                startIcon={<CreateOutlined fontSize="medium" />}
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

export default CreateService