import { DeleteOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DialogTransition from "../../../../../components/DialogTransation";
import { LoadingButton } from "@mui/lab";
import useDeleteTemplate from "../../../../../api/Template/useDeleteTemplate";

const DeleteButton = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const deleteTemplate = useDeleteTemplate()
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
            {t("ShowTemplate.delete_template")}
          </DialogContentText>
          <DialogContentText sx={{ maxWidth: "300px" }}>
            {t("ShowTemplate.delete_warning")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>
            {t("dialog_cancel")}
          </Button>
          <LoadingButton color="lighRed" loading={deleteTemplate.isPending} variant="contained" onClick={async () => {
            await deleteTemplate.mutateAsync()
            handleClose()
          }}>
            {t("dialog_delete")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
