import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import DialogTransition from "../../../../components/DialogTransation";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import FileInput from "../../../../components/FileInput";
import * as yup from "yup";
import useCreateOffer from "../../../../api/Offer/useCreateOffer";

const AddButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const createOffer = useCreateOffer();
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
            Add New Offer
          </DialogContentText>
          <Formik
            initialValues={{
              image: "",
            }}
            validationSchema={yup.object({
              image: yup.mixed().required("image is required"),
            })}
            onSubmit={async (values) => {
              await createOffer.mutateAsync(values);
              handleClose();
            }}
          >
            {({ handleSubmit, handleBlur, values, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <FileInput
                  handelBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  values={values}
                  label={"Image"}
                />
                <LoadingButton
                  loading={createOffer.isPending}
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
