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
import { LoadingButton } from "@mui/lab";
import useCreatePackageDetail from "../../../../../api/Packages/useCreatePackageDetail";

const AddButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { packageID } = useParams();
  const createDetail = useCreatePackageDetail()
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
            Add New Detail
          </DialogContentText>
          <Formik
            initialValues={{
              price: "",
              price_qr: "",
              number_of_invitees: "",
              package_id: +packageID,
            }}
            validationSchema={yup.object({
              price: yup.number().min(0).required("price is required"),
              price_qr: yup
                .number()
                .min(0)
                .required("price with qr code is required"),
              number_of_invitees: yup
                .number()
                .min(1)
                .required("number of people  is required"),
            })}
            onSubmit={async (values) => {
              await createDetail.mutateAsync(values);
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
                  <InputLabel>Price With QR</InputLabel>
                  <OutlinedInput
                    label="Price With QR"
                    type="number"
                    name="price_qr"
                    value={values.price_qr}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.price_qr && touched.price_qr}
                  />
                  {errors.price_qr && touched.price_qr && (
                    <FormHelperText error>{errors.price_qr}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Number Of people</InputLabel>
                  <OutlinedInput
                    type="number"
                    label="Number Of people"
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
                  loading={createDetail.isPending}
                  type="submit"
                  fullWidth
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
