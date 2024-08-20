import { DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DialogTransition from "../../../../components/DialogTransation";
import useDeleteProhibited from "../../../../api/Prihibited/useDeleteProhibited";
import { LoadingButton } from "@mui/lab";

const DeleteButton = ({ row }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const deletePirhibted = useDeleteProhibited();
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
        color="lighRed"
        onClick={handleClickOpen}
      >
        <DeleteOutlined />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={DialogTransition}
        keepMounted
        onClose={handleClose}
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
            {t("DeleteProhibitedThings.title")}
          </DialogContentText>
          <DialogContentText sx={{ maxWidth: "300px" }}>
            {t("DeleteProhibitedThings.warning")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>
            {t("dialog_cancel")}
          </Button>
          <LoadingButton
            color="lighRed"
            loading={deletePirhibted.isPending}
            variant="contained"
            onClick={async () => {
              await deletePirhibted.mutateAsync(row.id);
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
