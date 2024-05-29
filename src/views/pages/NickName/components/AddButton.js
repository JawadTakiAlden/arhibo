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
import useCreateNickName from "../../../../api/NickName/useCreateNickName";
const AddButton = () => {
  const { t } = useTranslation();
  const createNickName = useCreateNickName();

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
              nickname: "",
            }}
            validationSchema={yup.object({
              nickname: yup.string().required("nickname is required"),
            })}
            onSubmit={async (values) => {
              await createNickName.mutateAsync(values);
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
                  <InputLabel>Nickname</InputLabel>
                  <OutlinedInput
                    label="Nickname"
                    name="nickname"
                    value={values.nickname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.nickname && touched.nickname}
                  />
                  {errors.nickname && touched.nickname && (
                    <FormHelperText error>{errors.nickname}</FormHelperText>
                  )}
                </FormControl>

                <LoadingButton
                  loading={createNickName.isPending}
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
