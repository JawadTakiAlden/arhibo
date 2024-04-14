import { DownloadOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from 'yup'
import useStoreOrUpdate from "../../../../api/Contact/useStoreOrUpdate";

const ContactUsForm = ({initialValues , handelClose}) => {
  const {t} = useTranslation()
  const contactUs = useStoreOrUpdate()
  const handelCreate = async (values) => {
    await contactUs.mutateAsync(values)
    handelClose()
  }
  return (
    <Box
      sx={{
        py: 2,
        maxWidth : '70%',
        mx : 'auto'
      }}
    >
      <Formik
        onSubmit={handelCreate}
        validationSchema={yup.object({
          phone : yup.string().required('phone is rqeuired'),
          email : yup.string().required('email is required'),
          facebook: yup.string().required('facebook is required'),
          instagram: yup.string().required('instagram is required'),
          whatsapp: yup.string().required('whatsapp is rqeuired'),
          x: yup.string().required('x is required'),
        })}
          initialValues={{
            phone : initialValues?.phone,
            facebook :initialValues?.facebook,
            email: initialValues?.email,
            instagram: initialValues?.instagram,
            whatsapp: initialValues?.whatsapp,
            x: initialValues?.x,
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
                <InputLabel>Phone</InputLabel>
                <OutlinedInput 
                    label='Phone'
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    onBlur={handleBlur}
                    error={errors.phone && touched.phone}
                />
                {
                    errors.phone && touched.phone && <FormHelperText error>
                        {errors.phone}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>ُEmail</InputLabel>
                <OutlinedInput 
                    label='ُEmail'
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                />
                {
                    errors.email && touched.email && <FormHelperText error>
                        {errors.email}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>Facebook</InputLabel>
                <OutlinedInput 
                    label='Facebook'
                    name="facebook"
                    onChange={handleChange}
                    value={values.facebook}
                    onBlur={handleBlur}
                    error={errors.facebook && touched.facebook}
                />
                {
                    errors.facebook && touched.facebook && <FormHelperText error>
                        {errors.facebook}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>Instagram</InputLabel>
                <OutlinedInput 
                    label='Instagram'
                    name="instagram"
                    onChange={handleChange}
                    value={values.instagram}
                    onBlur={handleBlur}
                    error={errors.instagram && touched.instagram}
                />
                {
                    errors.instagram && touched.instagram && <FormHelperText error>
                        {errors.instagram}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>Whatsapp</InputLabel>
                <OutlinedInput 
                    label='Whatsapp'
                    name="whatsapp"
                    onChange={handleChange}
                    value={values.whatsapp}
                    onBlur={handleBlur}
                    error={errors.whatsapp && touched.whatsapp}
                />
                {
                    errors.whatsapp && touched.whatsapp && <FormHelperText error>
                        {errors.whatsapp}
                    </FormHelperText>
                }
              </FormControl>
              <FormControl color="success" fullWidth sx={{mb : 1}}>
                <InputLabel>X</InputLabel>
                <OutlinedInput 
                    label='X'
                    name="x"
                    onChange={handleChange}
                    value={values.x}
                    onBlur={handleBlur}
                    error={errors.x && touched.x}
                />
                {
                    errors.x && touched.x && <FormHelperText error>
                        {errors.x}
                    </FormHelperText>
                }
              </FormControl>
              <LoadingButton
                color="darkBlue"
                fullWidth
                variant="contained"
                type="submit"
                loading={contactUs.isPending}
                startIcon={<DownloadOutlined fontSize="medium" />}
              >
                {t('add')}
              </LoadingButton>
            </form>
          )}
        </Formik>
    </Box>
  );
};

export default ContactUsForm;


