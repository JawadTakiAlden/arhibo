import { DeleteOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DialogTransition from "../../../../../components/DialogTransation";
import useDeleteInput from "../../../../../api/Category/useDeleteInput";
import { LoadingButton } from "@mui/lab";
import useDeletePackageDetail from "../../../../../api/Packages/useDeletePackageDetail";

const DeleteButton = ({row}) => {
    const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  const deleteDetail = useDeletePackageDetail()
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
         scroll="paper"
        onClose={handleClose}
      >
        <DialogContent>
            <IconButton
            variant="contained"
            color="lighRed"
            sx={{
                mb : 3
            }}
            >
                <DeleteOutlined />
            </IconButton>
            <DialogContentText sx={{maxWidth : '300px' , mb : 2 , fontWeight : '500' , fontSize : '24px' ,letterSpacing :'3%'}}>
            {t('deleteTitle' , {objectName : "detail"})}
          </DialogContentText>
          <DialogContentText sx={{maxWidth : '300px'}}>
          {t('deleteWarning' , {objectName : "detail"})}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>{t('dialog_cancel')}</Button>
          <LoadingButton loading={deleteDetail.isPending} color="lighRed" variant="contained" onClick={async () => {
            await deleteDetail.mutateAsync(row.id)
            handleClose()
            }}>{t('dialog_delete')}</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton