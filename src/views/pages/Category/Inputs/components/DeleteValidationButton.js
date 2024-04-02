import { DeleteOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DialogTransition from "../../../../../components/DialogTransation";
import useDeleteValidation from "../../../../../api/Category/useDeleteValidation";
import { LoadingButton } from "@mui/lab";

const DeleteValidationButton = ({row}) => {
    const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  const deleteVldaition = useDeleteValidation()
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
              mb : 3
          }}
          >
              <DeleteOutlined />
          </IconButton>
          <DialogContentText sx={{maxWidth : '300px' , mb : 2 , fontWeight : '500' , fontSize : '24px' ,letterSpacing :'3%'}}>
          {t('AllCoupons.DeleteButton.delete_coupon')}
        </DialogContentText>
        <DialogContentText sx={{maxWidth : '300px'}}>
        {t('AllCoupons.DeleteButton.delete_warning')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="grey" variant="contained" onClick={handleClose}>{t('dialog_cancel')}</Button>
        <LoadingButton loading={deleteVldaition.isPending}  color="lighRed" variant="contained" onClick={async() => {
          await deleteVldaition.mutateAsync(row.id)
          handleClose()
        }}>{t('dialog_delete')}</LoadingButton>
      </DialogActions>
    </Dialog>
  </>
  )
}

export default DeleteValidationButton