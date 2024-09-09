import { DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DialogTransition from "../../../../components/DialogTransation";
import { LoadingButton } from "@mui/lab";
import useDeleteSecondaryPackage from "../../../../api/SecondaryPackages/useDeleteSecondaryPackage";

const DeleteButton = ({ packageSecondaryId }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const deletePackage = useDeleteSecondaryPackage();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Fab onClick={handleClickOpen} color="error">
        <DeleteOutlined />
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={DialogTransition}
        keepMounted
        onClose={handleClose}
         scroll="paper"
      >
        <DialogContent>
          <IconButton
            variant="contained"
            color="lighRed"
            sx={{
              mb: 3,
            }}
          >
            <DeleteOutlined />
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
            {t("DeleteSecondaryPackage.delete_title")}
          </DialogContentText>
          <DialogContentText sx={{ maxWidth: "300px" }}>
            {t("DeleteSecondaryPackage.delete_warning")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>
            {t("dialog_cancel")}
          </Button>
          <LoadingButton
            loading={deletePackage.isPending}
            color="lighRed"
            variant="contained"
            onClick={async () => {
              await deletePackage.mutateAsync(packageSecondaryId);
              handleClose();
            }}
          >
            {t("dialog_delete")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
