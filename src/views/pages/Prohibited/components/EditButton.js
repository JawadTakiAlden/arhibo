import { Dialog, DialogContent, DialogContentText, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, SvgIcon } from "@mui/material";
import React, { useState } from "react";
import DialogTransition from "../../../../components/DialogTransation";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import useUpdateProhibited from "../../../../api/Prihibited/useUpdateProhibited";
import * as yup from 'yup'

const EditButton = ({ row }) => {
    const update = useUpdateProhibited()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <>
      <IconButton
        sx={{ borderRadius: "8px" }}
        variant="contained"
        color="success"
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
            Update Prohibited
          </DialogContentText>
          <Formik
            initialValues={{
              name: row.name,
              name_ar: row.name_ar,
            }}
            validationSchema={yup.object({
              name: yup.string().max(255).required("name is required"),
              name_ar: yup
                .string()
                .max(255)
                .required("arabic name is required"),
            })}
            onSubmit={async (values) => {
              await update.mutateAsync({
                data: values,
                id: row.id,
              });
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
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>English Name</InputLabel>
                  <OutlinedInput
                    label="English Name"
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
                  <InputLabel>Arabic Name</InputLabel>
                  <OutlinedInput
                    label="Arabic Name"
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
                <LoadingButton
                  loading={update.isPending}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  Update
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
