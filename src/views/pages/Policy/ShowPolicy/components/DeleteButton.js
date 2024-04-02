import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import DialogTransition from "../../../../../components/DialogTransation";
import { DeleteOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import useDeletePloicy from "../../../../../api/Policy/useDeletePolicy";

const DeleteButton = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const deletePolicy = useDeletePloicy();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        color="lighRed"
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          flexBasis: "50%",
        }}
        startIcon={<DeleteOutlined fontSize="medium" />}
      >
        {t("delete")}
      </Button>
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
            {t("ShowTerm.delete_term")}
          </DialogContentText>
          <DialogContentText sx={{ maxWidth: "300px" }}>
            {t("ShowTerm.delete_warning")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>
            {t("dialog_cancel")}
          </Button>
          <LoadingButton
            color="lighRed"
            variant="contained"
            loading={deletePolicy.isPending}
            onClick={async () => {
              await deletePolicy.mutateAsync();
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
