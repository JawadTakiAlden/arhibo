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
import { LoadingButton } from "@mui/lab";
import useDeleteOffer from "../../../../api/Offer/useDeleteOffer";

const DeleteButton = ({ row }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const deleteOffer = useDeleteOffer();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        color="error"
        onClick={handleClickOpen}
        variant="contained"
        sx={{
          transition: "0.3s",
          opacity: 0,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          zIndex: 100,
          fontSize: "35px",
        }}
      >
        <DeleteOutlined fontSize="inherit" />
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
            {t("deleteTitle", { objectName: "Offer" })}
          </DialogContentText>
          <DialogContentText sx={{ maxWidth: "300px" }}>
            {t("deleteWarning", { objectName: "offer" })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>
            {t("dialog_cancel")}
          </Button>
          <LoadingButton
            loading={deleteOffer.isPending}
            color="lighRed"
            variant="contained"
            onClick={async () => {
              await deleteOffer.mutateAsync(row.id);
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
