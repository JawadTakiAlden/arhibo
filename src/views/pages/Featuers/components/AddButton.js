import {
  Autocomplete,
  Button,
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
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { Add } from "@mui/icons-material";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import useCreateFeatuer from "../../../../api/Featuers/useCreateFeatuer";
import DialogTransition from "../../../../components/DialogTransation";
import useGetPackages from "../../../../api/Packages/useGetPackages";
const AddButton = () => {
  const { t } = useTranslation();
  const [openPackages, setOpenPackages] = useState(false);
  const createFeatuer = useCreateFeatuer();
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
      <Button
        variant="contained"
        color="darkBlue"
        endIcon={<Add />}
        size="medium"
        onClick={handleClickOpen}
      >
        {t("add_new")}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={DialogTransition}
        onClose={handleClose}
        // scroll={scroll}
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
              name: "",
              name_ar: "",
              description: "",
              description_ar: "",
              type: "withValue",
              price: "",
              quantity: 1,
              package_ids: [],
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
              price : yup.number().required('price is rqeuired'),
              type: yup.string().required("type is required"),
              package_ids: yup
                .array()
                .min(1)
                .required("your must provide one package  at least"),
            })}
            onSubmit={async (values) => {
              values.package_ids = values.package_ids.map(packageObj => packageObj.id)
              await createFeatuer.mutateAsync(values);
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
                    onOpen={() => {
                      setOpenPackages(true);
                    }}
                    onClose={() => {
                      setOpenPackages(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.name}
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
                  {
                    !!touched.package_ids && !!errors.package_ids && <FormHelperText error>
                      {errors.package_ids}
                    </FormHelperText>
                  }
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

export default AddButton;
