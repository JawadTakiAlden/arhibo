import {
    Button,
    Dialog,
    SvgIcon,
    DialogContent,
    DialogContentText,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    OutlinedInput,
  } from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import DialogTransition from "../../../../../components/DialogTransation";
import { useParams } from "react-router";
import { Formik } from "formik";
import useUpdateInput from "../../../../../api/Category/useUpdateInput";
import { LoadingButton } from "@mui/lab";

const EditButton = ({row}) => {
    const [open, setOpen] = useState(false);
    const { catgeoryID } = useParams();
    const updateInput = useUpdateInput()
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <>
      <IconButton
      onClick={handleClickOpen}
        sx={{ borderRadius: "8px" }}
        variant="contained"
        color="success"
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
            sx={{
              mb: 3,
            }}
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
          <DialogContentText
            sx={{
              maxWidth: "300px",
              mb: 2,
              fontWeight: "500",
              fontSize: "24px",
              letterSpacing: "3%",
            }}
          >
            Update Input
          </DialogContentText>
          <Formik
            initialValues={{
              input_name: row.input_name,
              input_name_ar: row.input_name_ar,
              category_id: +catgeoryID,
              placeholder: row.placeholder,
              placeholder_ar: row.placeholder_ar,
            }}
            validationSchema={yup.object({
              input_name: yup
                .string()
                .max(255)
                .required("input name is required"),
              input_name_ar: yup
                .string()
                .max(255)
                .required("arabic input name is required"),
              placeholder: yup
                .string()
                .max(255)
                .required("placeholder is required"),
              placeholder_ar: yup
                .string()
                .max(255)
                .required("arabic placeholder is required"),
            })}
            onSubmit={async(values) => {
                await updateInput.mutateAsync({id : row.id , data : values})
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
                  <InputLabel>Arabic Input Name</InputLabel>
                  <OutlinedInput
                    label="Arabic Input Name"
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
                <LoadingButton loading={updateInput.isPending} type="submit" fullWidth variant="contained" color="success">Update</LoadingButton>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
