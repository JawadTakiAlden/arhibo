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
import useAddValidationToInput from "../../../../../api/Category/useAddValidationToInput";
import { LoadingButton } from "@mui/lab";
const AddValidationButton = ({input_id}) => {
 const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const createvalidation = useAddValidationToInput()
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
        sx={{
            mb : 1
        }}
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
            Add New Validation
          </DialogContentText>
          <Formik
            initialValues={{
                message: "",
                message_ar: "",
                name: "",
                input_id : input_id
              }}
              validationSchema={yup.object({
                  message: yup
                  .string()
                  .max(255)
                  .required("message is required"),
                  message_ar: yup
                  .string()
                  .max(255)
                  .required("message is required"),
                  name: yup
                  .string()
                  .max(255)
                  .required("regex_code is required"),
              })}
              onSubmit={ async (values) => {
                await createvalidation.mutateAsync(values)
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
                  <InputLabel>Regex Code</InputLabel>
                  <OutlinedInput
                    label="Regex Code"
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
                  <InputLabel>Message</InputLabel>
                  <OutlinedInput
                    label="Message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message && touched.message}
                  />
                  {errors.message && touched.message && (
                    <FormHelperText error>{errors.message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Arabic Message</InputLabel>
                  <OutlinedInput
                    label="Arabic Message"
                    name="message_ar"
                    value={values.message_ar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message_ar && touched.message_ar}
                  />
                  {errors.message_ar && touched.message_ar && (
                    <FormHelperText error>{errors.message_ar}</FormHelperText>
                  )}
                </FormControl>
                <LoadingButton loading={createvalidation.isPending} type="submit" fullWidth variant="contained" color="success">Create</LoadingButton>
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
}

export default AddValidationButton