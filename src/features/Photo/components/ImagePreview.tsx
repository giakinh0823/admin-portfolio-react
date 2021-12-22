import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import * as React from "react";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export interface IImagePreviewProps {
  image: any;
  open: boolean;
  onClose: any;
  handleRemove?: any
}

const ImagePreview = ({ image, open, onClose,handleRemove }: IImagePreviewProps) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        scroll="body"
        sx={{
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Hình ảnh"}</DialogTitle>
        <DialogContent sx={{ maxWidth: "1500px" }}>
          {image && (
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
              <img
                src={image?.url}
                srcSet={image?.url}
                alt={"preview"}
                loading="lazy"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            onClick={handleRemove}
          >
            <DeleteOutlineOutlinedIcon/>
          </ButtonPrimary>
          <ButtonPrimary onClick={onClose}>Thoát</ButtonPrimary>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImagePreview;
