import { Login, Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import useLogin from '../../../api/useLogin'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const login = useLogin()
  const {t} = useTranslation()
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const LoginUserIn = (values) => {
    login.mutate(values)
  };
  return (
    <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        maxWidth: "600px",
        p : 2
      }}
    >
      <Formik
        initialValues={{
          email : "",
          password : ""
        }}
        validationSchema={yup.object({
          email : yup.string().email().required('email is required'),
          password : yup.string().min(7).max(26).required('password is required')
        })}
        onSubmit={LoginUserIn}
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
              <FormControl color="success" sx={{ mb: 1}} fullWidth variant="outlined">
              <InputLabel>
                {t("LoginForm.email")}
              </InputLabel>
              <OutlinedInput
                type='email'
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                label= {t("LoginForm.email")}
              />
              {
                  touched.email && errors.email && <FormHelperText error>
                  {errors.email}
                  </FormHelperText>
              }
            </FormControl>
            <FormControl color="success" sx={{ mb: 1}} fullWidth variant="outlined">
              <InputLabel>
              {t("LoginForm.password")}
              </InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label= {t("LoginForm.password")}
              />
              {
                  touched.password && errors.password && <FormHelperText error>
                  {errors.password}
                  </FormHelperText>
              }
              
            </FormControl>
            <FormControl color="success"  fullWidth variant="outlined">
            <LoadingButton
              loading={login.isPending}
              loadingPosition="start"
              startIcon={<Login />}
              variant='contained'
              type="submit"
              fullWidth
              color="success"
              sx={{
                color : 'white',
                height : '50px'
              }}
            >
               {t("LoginForm.login")}
            </LoadingButton>
            </FormControl>
          </form>
        )}
      </Formik>
    </Box>
  </Box>
  )
}

export default LoginForm