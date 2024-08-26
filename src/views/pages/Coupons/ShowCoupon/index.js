import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { CreateOutlined, DownloadOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useGetPackages from "../../../../api/Packages/useGetPackages";
import useGetAllCategories from "../../../../api/Category/useGetAllCategories";
import useUpdateCoupon from "../../../../api/Coupon/useUpdateCoupon";
import useShowCoupon from "../../../../api/Coupon/useShowCoupon";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const ShowCoupon = () => {
  const { t } = useTranslation();
  const [packageOpen, setPackageOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const packages = useGetPackages();
  const catgeories = useGetAllCategories();
  const couponInfo = useShowCoupon();
  const updateCoupon = useUpdateCoupon();
  const handelCreate = (values) => {
    values = {
      ...values,
      categories: values.categories.map((cat) => cat.id),
      packages: values.packages.map((cat) => cat.id),
      expiry_date: dayjs(values.expiry_date).format("YYYY-MM-DD"),
    };
    updateCoupon.mutate(values);
  };

  if (couponInfo.isLoading) {
    return "loading ...";
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
            coupon_code: yup
              .string()

              .required(t("CouponForms.name_ar_val")),
            offer: yup
              .number()
              .min(0)
              .max(100)
              .required(t("CouponForms.name_en_val")),
            categories: yup
              .array()
              .min(1)
              .required(t("CouponForms.description_ar_val")),
            packages: yup
              .array()
              .min(1)
              .required(t("CouponForms.description_en_val")),
            expiry_date: yup.date().required("expiry date is requried"),
          })}
          initialValues={{
            coupon_code: couponInfo?.data?.data?.coupon_code,
            offer: couponInfo?.data?.data?.offer,
            categories: couponInfo?.data?.data?.categories,
            packages: couponInfo?.data?.data?.packages,
            expiry_date: dayjs(couponInfo?.data?.data?.expiry_date),
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
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>Coupon Code</InputLabel>
                <OutlinedInput
                  label="Coupon Code"
                  name="coupon_code"
                  onChange={handleChange}
                  value={values.coupon_code}
                  onBlur={handleBlur}
                  error={errors.coupon_code && touched.coupon_code}
                />
                {errors.coupon_code && touched.coupon_code && (
                  <FormHelperText error>{errors.coupon_code}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>Offer</InputLabel>
                <OutlinedInput
                  label="Offer"
                  name="offer"
                  type="number"
                  value={values.offer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.offer && touched.offer}
                />
                {errors.offer && touched.offer && (
                  <FormHelperText error>{errors.offer}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                {/* <InputLabel>Expiry Date</InputLabel> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Expiry Date"
                    value={values.expiry_date}
                    onChange={(newValue) =>
                      setFieldValue("expiry_date", newValue)
                    }
                  />
                </LocalizationProvider>
                {errors.expiry_date && touched.expiry_date && (
                  <FormHelperText error>{errors.expiry_date}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <Autocomplete
                  open={packageOpen}
                  onOpen={() => {
                    setPackageOpen(true);
                  }}
                  onClose={() => {
                    setPackageOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  multiple
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  defaultValue={values.packages}
                  options={packages?.data?.data || []}
                  loading={packages.isLoading}
                  onChange={(e, v) => {
                    setFieldValue("packages", v);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Packages"
                      name="packages"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {packages.isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.packages && touched.packages && (
                  <FormHelperText error>{errors.packages}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <Autocomplete
                  open={categoryOpen}
                  onOpen={() => {
                    setCategoryOpen(true);
                  }}
                  onClose={() => {
                    setCategoryOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  defaultValue={values.categories}
                  multiple
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  options={catgeories?.data?.data || []}
                  loading={catgeories.isLoading}
                  onChange={(e, v) => {
                    setFieldValue("categories", v);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categories"
                      name="categories"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {catgeories.isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.categories && touched.categories && (
                  <FormHelperText error>{errors.categories}</FormHelperText>
                )}
              </FormControl>
              <LoadingButton
                color="darkBlue"
                fullWidth
                variant="contained"
                loading={updateCoupon.isPending}
                type="submit"
                startIcon={<CreateOutlined fontSize="medium" />}
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

export default ShowCoupon;
