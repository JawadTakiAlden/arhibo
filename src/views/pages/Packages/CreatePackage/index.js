import { DownloadOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import useCreatePackage from '../../../../api/Packages/useCreatePackage'

const CreatePackage = () => {
    const {t} = useTranslation()
    const createPackage = useCreatePackage()
      const handelCreate = (values) => {
        createPackage.mutate(values)
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
        })}
          initialValues={{
            name_ar : "",
            name : "",
            description_ar: "",
            description: "",
            color : ''
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
                <InputLabel>{t('CreatePackage.name_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('CreatePackage.name_ar')}
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
                <InputLabel>{t('CreatePackage.name_en')}</InputLabel>
                <OutlinedInput 
                    label={t('CreatePackage.name_en')}
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
                <InputLabel>{t('CreatePackage.description_ar')}</InputLabel>
                <OutlinedInput 
                    label={t('CreatePackage.description_ar')}
                    name="description_ar"
                    value={values.description_ar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    multiline
                    minRows={4}
                    maxRows={6}
                    error={errors.description_ar && touched.description_ar}
                />
                {
                    errors.description_ar && touched.description_ar && <FormHelperText error>
                        {errors.description_ar}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>{t('CreatePackage.description_en')}</InputLabel>
                <OutlinedInput 
                    label={t('CreatePackage.description_en')}
                    name="description"
                    value={values.description}
                    multiline
                    minRows={4}
                    maxRows={6}
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
                <InputLabel>{t('CreatePackage.color')}</InputLabel>
                <OutlinedInput 
                    label={t('CreatePackage.color')}
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.color && touched.color}
                />
                {
                    errors.color && touched.color && <FormHelperText error>
                        {errors.color}
                    </FormHelperText>
                }
              </FormControl>
              <LoadingButton
                color="darkBlue"
                fullWidth
                variant="contained"
                loading={createPackage.isPending}
                type="submit"
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

export default CreatePackage