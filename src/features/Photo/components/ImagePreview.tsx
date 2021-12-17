import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import * as React from "react";
import ButtonPrimary from "../../../components/button/ButtonPrimary";

export interface IImagePreviewProps {
  image: any;
  open: boolean;
  onClose: any;
}

export default function ImagePreview({
  image,
  open,
  onClose,
}: IImagePreviewProps) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        sx={{
          height: "fit-content",
          top: "200px",
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Tải hình ảnh lên"}</DialogTitle>
        <DialogContent sx={{ maxWidth: "600px", minWidth: "500px" }}>
          {image ? (
            <Box
              sx={{
                display: "flex",
                maxWidth: "100%",
                minHeight: "300px",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                minHeight: "300px",
                justifyContent: "center",
                alignItems: "center",
                border: "2px  dashed #000",
              }}
            ></Box>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonPrimary onClick={onClose}>Thoát</ButtonPrimary>
        </DialogActions>
      </Dialog>
    </>
  );
}
