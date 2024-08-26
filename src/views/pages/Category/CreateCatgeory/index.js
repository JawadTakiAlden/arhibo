import {
  Box, FormControl, FormHelperText, InputLabel, OutlinedInput,
} from "@mui/material";
import React from "react";
import FileInput from "../../../../components/FileInput";
import { Formik } from "formik";
import * as yup from 'yup'
import { LoadingButton } from "@mui/lab";
import { DownloadOutlined , CreateOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useCreateCategory from "../../../../api/Category/useCreateCategory";

const CreateCatgeory = () => {
  const {t} = useTranslation()
  const createCategory = useCreateCategory()
    const handelCreate = (values) => {
      createCategory.mutate(values)
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
            name_ar : yup.string().required(),
            name : yup.string().required(),
            description_ar: yup.string().required(),
            description: yup.string().required(),
            image : yup.mixed().required(),
            photo : yup.mixed().required(),
            nice_sentence : yup.string().required()
        })}
          initialValues={{
            name_ar : "",
            name : "",
            description_ar: "",
            description: "",
            image : "",
            nice_sentence : ""
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
                arrtName="image"
                setFieldValue={setFieldValue}
                label={t('CategoryForms.icon_of_category')}
              />
              <FileInput 
                handelBlur={handleBlur}
                values={values}
                arrtName="photo"
                setFieldValue={setFieldValue}
                label={t('CategoryForms.image_of_category')}
              />
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('CategoryForms.name_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('CategoryForms.name_ar')}
                    name="name_ar"
                    onChange={handleChange}
                    value={values.name_ar}
                    onBlur={handleBlur}
                    error={errors.name_ar && touched.name_ar}
                />
                {
                    errors.name_ar && touched.name_ar && <FormHelperText error>
                        {errors.name_ar}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('CategoryForms.name_en')}</InputLabel>
                <OutlinedInput 
                    label={t('CategoryForms.name_en')}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                />
                {
                    errors.name && touched.name && <FormHelperText error>
                        {errors.name}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('CategoryForms.description_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('CategoryForms.description_ar')}
                    name="description_ar"
                    value={values.description_ar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description_ar && touched.description_ar}
                />
                {
                    errors.description_ar && touched.description_ar && <FormHelperText error>
                        {errors.description_ar}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('CategoryForms.description_en')}</InputLabel>
                <OutlinedInput 
                    label={t('CategoryForms.description_en')}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description && touched.description}
                />
                {
                    errors.description && touched.description && <FormHelperText error>
                        {errors.description}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('CategoryForms.nice_sentence')}</InputLabel>
                <OutlinedInput 
                    label={t('CategoryForms.nice_sentence')}
                    name="nice_sentence"
                    value={values.nice_sentence}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.nice_sentence && touched.nice_sentence}
                />
                {
                    errors.nice_sentence && touched.nice_sentence && <FormHelperText error>
                        {errors.nice_sentence}
                    </FormHelperText>
                }
              </FormControl>
              <LoadingButton
                color="darkBlue"
                fullWidth
                variant="contained"
                loading={createCategory.isPending}
                type="submit"
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
};

export default CreateCatgeory;
