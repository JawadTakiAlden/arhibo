import {
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  SvgIcon,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { Add } from "@mui/icons-material";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import useGetPackages from "../../../../api/Packages/useGetPackages";
import useUpdateFeatuer from "../../../../api/Featuers/useUpdateFeatuer";
import DialogTransition from "../../../../components/DialogTransation";
const EditButton = ({ row }) => {
  const { t } = useTranslation();
  const [openPackages, setOpenPackages] = useState(false);
  const createFeatuer = useUpdateFeatuer();
  const packages = useGetPackages();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        // variant="contained"
        // color="darkBlue"
        color="success"
        endIcon={<Add />}
        size="medium"
        onClick={handleClickOpen}
      >
        <SvgIcon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.1665 3.3335H3.33317C2.89114 3.3335 2.46722 3.50909 2.15466 3.82165C1.8421 4.13421 1.6665 4.55814 1.6665 5.00016V16.6668C1.6665 17.1089 1.8421 17.5328 2.15466 17.8453C2.46722 18.1579 2.89114 18.3335 3.33317 18.3335H14.9998C15.4419 18.3335 15.8658 18.1579 16.1783 17.8453C16.4909 17.5328 16.6665 17.1089 16.6665 16.6668V10.8335"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.4165 2.0832C15.748 1.75168 16.1977 1.56543 16.6665 1.56543C17.1353 1.56543 17.585 1.75168 17.9165 2.0832C18.248 2.41472 18.4343 2.86436 18.4343 3.3332C18.4343 3.80204 18.248 4.25168 17.9165 4.5832L9.99984 12.4999L6.6665 13.3332L7.49984 9.99986L15.4165 2.0832Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </SvgIcon>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={DialogTransition}
        onClose={handleClose}
      >
        <DialogContent>
          <IconButton
            variant="contained"
            color="success"
            sx={
              {
                // mb: 3,
                // mt : 3
              }
            }
          >
            <Add />
          </IconButton>
          <DialogContentText
            sx={{
              maxWidth: "300px",
              mb: 2,
              fontWeight: "500",
              fontSize: "24px",
              letterSpacing: "3%",
            }}
          >
            Add New Featuer
          </DialogContentText>
          <Formik
            initialValues={{
              name: row.name,
              name_ar: row.name_ar,
              description: row.description,
              description_ar: row.description_ar,
              type: row.type,
              price: row.price,
              quantity: row.quantity,
              package_ids: row.packages
            }}
            validationSchema={yup.object({
              name: yup.string().required("english features name is required"),
              name_ar: yup
                .string()
                .required("arabic features name is required"),
              description: yup
                .string()
                .nullable("english features description is required"),
              description_ar: yup
                .string()
                .nullable("arabic features description is required"),
              quantity: yup.number().min(0).required("qunatity is required"),
              price: yup.number().required("price is rqeuired"),
              type: yup.string().required("type is required"),
              package_ids: yup
                .array()
                .min(1)
                .required("your must provide one package  at least"),
            })}
            onSubmit={async (values) => {
              values.package_ids = values.package_ids.map(
                (packageObj) => packageObj.id
              );
              await createFeatuer.mutateAsync({data : values , featuerID : row.id});
              handleClose();
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>English Features Name</InputLabel>
                  <OutlinedInput
                    label="English Features Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                  />
                  {errors.name && touched.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Arabic Features Name</InputLabel>
                  <OutlinedInput
                    label="Arabic Features Name"
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
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>English Features Description</InputLabel>
                  <OutlinedInput
                    label="English Features Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description && touched.description}
                  />
                  {errors.description && touched.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Arabic Features Description</InputLabel>
                  <OutlinedInput
                    label="Arabic Filter Description"
                    name="description_ar"
                    value={values.description_ar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description_ar && touched.description_ar}
                  />
                  {errors.description_ar && touched.description_ar && (
                    <FormHelperText error>
                      {errors.description_ar}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Quantity</InputLabel>
                  <OutlinedInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.quantity && touched.quantity}
                  />
                  {errors.quantity && touched.quantity && (
                    <FormHelperText error>{errors.quantity}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    label="Price"
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.price && touched.price}
                  />
                  {errors.price && touched.price && (
                    <FormHelperText error>{errors.price}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <Autocomplete
                    fullWidth
                    id="packages_ids"
                    open={openPackages}
                    multiple
                    filterSelectedOptions
                    disableCloseOnSelect
                    value={values.package_ids}
                    onOpen={() => {
                      setOpenPackages(true);
                    }}
                    onClose={() => {
                      setOpenPackages(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                    getOptionLabel={(option) => option?.name}
                    options={packages?.data?.data || []}
                    onChange={(e, v) => {
                      setFieldValue("package_ids", v);
                    }}
                    onBlur={handleBlur}
                    loading={packages.isLoading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Packages"
                        error={!!touched.package_ids && !!errors.package_ids}
                        color="success"
                        fullWidth
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
                  {!!touched.package_ids && !!errors.package_ids && (
                    <FormHelperText error>{errors.package_ids}</FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth color="success">
                  {/* <FormLabel id="type" >
                    Type
                  </FormLabel> */}
                  <RadioGroup
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="withValue"
                      control={<Radio />}
                      label="With Value"
                    />
                    <FormControlLabel
                      value="withoutValue"
                      control={<Radio />}
                      label="Without Value"
                    />
                  </RadioGroup>
                </FormControl>
                <LoadingButton
                  loading={createFeatuer.isPending}
                  type="submit"
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                  variant="contained"
                  color="success"
                >
                  Create
                </LoadingButton>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
