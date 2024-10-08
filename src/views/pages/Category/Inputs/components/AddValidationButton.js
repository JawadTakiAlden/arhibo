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
       scroll="paper"
        open={open}
        TransitionComponent={DialogTransition}
        onClose={handleClose}
      >
        <DialogContent>
          <IconButton
            variant="contained"
            color="success"
            sx={{ mb: 3 }}
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
            {t("AddValidation.title")}
          </DialogContentText>
          <Formik
            initialValues={{
              message: "",
              message_ar: "",
              name: "",
              input_id: input_id,
            }}
            validationSchema={yup.object({
              message: yup
                .string()
                .required(t("AddValidation.message_required")),
              message_ar: yup
                .string()
                .required(t("AddValidation.message_ar_required")),
              name: yup
                .string()
                .required(t("AddValidation.regex_code_required")),
            })}
            onSubmit={async (values) => {
              await createvalidation.mutateAsync(values);
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
                  <InputLabel>{t("AddValidation.regex_code")}</InputLabel>
                  <OutlinedInput
                    label={t("AddValidation.regex_code")}
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
                  <InputLabel>{t("AddValidation.message")}</InputLabel>
                  <OutlinedInput
                    label={t("AddValidation.message")}
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
                  <InputLabel>{t("AddValidation.message_ar")}</InputLabel>
                  <OutlinedInput
                    label={t("AddValidation.message_ar")}
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
                <LoadingButton
                  loading={createvalidation.isPending}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  {t("AddValidation.create")}
                </LoadingButton>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddValidationButton