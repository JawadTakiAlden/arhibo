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
import useCreateFilter from "../../../../../api/Category/useCreateFilter";
const AddButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const createFilter = useCreateFilter()
  const { catgeoryID } = useParams();
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
           {t('AddFilterInCategory.title')}
          </DialogContentText>
          <Formik
            initialValues={{
              name: "",
              name_ar: "",
              category_id: +catgeoryID,
            }}
            validationSchema={yup.object({
              name: yup.string().required(),
              name_ar: yup
                .string()
                
                .required(),
            })}
            onSubmit={async (values) => {
                await createFilter.mutateAsync(values);
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
                  <InputLabel>{t('FiltersForm.name_en')}</InputLabel>
                  <OutlinedInput
                    label={t('FiltersForm.name_en')}
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
                  <InputLabel>{t('FiltersForm.name_ar')}</InputLabel>
                  <OutlinedInput
                    label={t('FiltersForm.name_ar')}
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
                    loading={createFilter.isPending}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  {t('add')}
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
