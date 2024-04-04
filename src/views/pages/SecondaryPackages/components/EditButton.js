import { Add, EditOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent, DialogContentText, Fab, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from 'yup'
import DialogTransition from "../../../../components/DialogTransation";
import useUpdateSecondaryPackage from "../../../../api/SecondaryPackages/useUpdateSecondaryPackage";

const EditButton = ({secondaryPackage}) => {
  const { t } = useTranslation();
  const update = useUpdateSecondaryPackage()
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Fab onClick={handleClickOpen} color="warning">
        <EditOutlined />
      </Fab>
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
            Add New Package
          </DialogContentText>
          <Formik
            initialValues={{
              price: secondaryPackage.price,
              number_of_invitees: secondaryPackage.number_of_invitees,
            }}
            validationSchema={yup.object({
              price: yup.number().min(0).required("filter name is required"),
              number_of_invitees: yup
                .number()
                .min(0)
                .required("arabic filter name is required"),
            })}
            onSubmit={async (values) => {
              await update.mutateAsync({data : values , id : secondaryPackage.id});
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
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    type="number"
                    label="Price"
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
                  <InputLabel>Number Of People</InputLabel>
                  <OutlinedInput
                    type="number"
                    label="Number Of People"
                    name="number_of_invitees"
                    value={values.number_of_invitees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors.number_of_invitees && touched.number_of_invitees
                    }
                  />
                  {errors.number_of_invitees && touched.number_of_invitees && (
                    <FormHelperText error>
                      {errors.number_of_invitees}
                    </FormHelperText>
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
