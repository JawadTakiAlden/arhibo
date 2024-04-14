import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DialogTransition from "../../../../../components/DialogTransation";
import { Formik } from "formik";
import { Add } from "@mui/icons-material";
import { useParams } from "react-router";
import * as yup from "yup";
import useCreateInput from "../../../../../api/Category/useCreateInput";
import { LoadingButton } from "@mui/lab";

const AddButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { catgeoryID } = useParams();
  const createInput = useCreateInput()
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
      >
        <DialogContent>
          <IconButton
            variant="contained"
            color="success"
            sx={{
              mb: 3,
            }}
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
            Add New Input
          </DialogContentText>
          <Formik
            initialValues={{
              input_name: "",
              input_name_ar: "",
              category_id: +catgeoryID,
              placeholder: "",
              placeholder_ar: "",
            }}
            validationSchema={yup.object({
              input_name: yup
                .string()
                
                .required("input name is required"),
              input_name_ar: yup
                .string()
                
                .required("input name is required"),
              placeholder: yup
                .string()
                
                .required("placeholder is required"),
              placeholder_ar: yup
                .string()
                
                .required("arabic placeholder is required"),
            })}
            onSubmit={ async (values) => {
              await createInput.mutateAsync(values)
              handleClose()
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Input Name</InputLabel>
                  <OutlinedInput
                    label="Input Name"
                    name="input_name"
                    value={values.input_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.input_name && touched.input_name}
                  />
                  {errors.input_name && touched.input_name && (
                    <FormHelperText error>{errors.input_name}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Input Arabic Name</InputLabel>
                  <OutlinedInput
                    label="Input Arabic Name"
                    name="input_name_ar"
                    value={values.input_name_ar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.input_name_ar && touched.input_name_ar}
                  />
                  {errors.input_name_ar && touched.input_name_ar && (
                    <FormHelperText error>{errors.input_name_ar}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Placeholder</InputLabel>
                  <OutlinedInput
                    label="Placeholder"
                    name="placeholder"
                    value={values.placeholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.placeholder && touched.placeholder}
                  />
                  {errors.placeholder && touched.placeholder && (
                    <FormHelperText error>{errors.placeholder}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Arabic Placeholder</InputLabel>
                  <OutlinedInput
                    label="Arabic Placeholder"
                    name="placeholder_ar"
                    value={values.placeholder_ar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.placeholder_ar && touched.placeholder_ar}
                  />
                  {errors.placeholder_ar && touched.placeholder_ar && (
                    <FormHelperText error>{errors.placeholder_ar}</FormHelperText>
                  )}
                </FormControl>
                <LoadingButton loading={createInput.isPending} type="submit" fullWidth variant="contained" color="success">Create</LoadingButton>
              </form>
            )}
          </Formik>
        </DialogContent>
        {/* <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>
            {t("dialog_cancel")}
          </Button>
          <Button color="lighRed" variant="contained" onClick={handleClose}>
            {t("dialog_delete")}
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default AddButton;
