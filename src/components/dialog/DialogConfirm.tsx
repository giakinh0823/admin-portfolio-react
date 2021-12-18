import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import ButtonPrimary from "../button/ButtonPrimary";

export default function DialogConfirm({
  message,
  open,
  title,
  handleConfirm,
  handleClose,
}: any) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonPrimary onClick={handleClose}>Hủy bỏ</ButtonPrimary>
        <ButtonPrimary onClick={handleConfirm}>Xác nhận</ButtonPrimary>
      </DialogActions>
    </Dialog>
  );
}
