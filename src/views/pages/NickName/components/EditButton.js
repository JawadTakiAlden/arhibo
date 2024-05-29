import {
  Autocomplete,
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
  SvgIcon,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { Add } from "@mui/icons-material";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import useGetPackages from "../../../../api/Packages/useGetPackages";
import useUpdateFeatuer from "../../../../api/Featuers/useUpdateFeatuer";
import DialogTransition from "../../../../components/DialogTransation";
import useUpdateNickName from "../../../../api/NickName/useUpdateNickName";
const EditButton = ({ row }) => {
  const { t } = useTranslation();
  const updateNickName = useUpdateNickName();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        // variant="contained"
        // color="darkBlue"
        color="success"
        endIcon={<Add />}
        size="medium"
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
              nickname: row.nickname,
            }}
            validationSchema={yup.object({
              nickname: yup.string().required("nickname is required"),
        
            })}
            onSubmit={async (values) => {
              await updateNickName.mutateAsync({data : values , nickNameID : row.id});
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
                  loading={updateNickName.isPending}
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

export default EditButton;
