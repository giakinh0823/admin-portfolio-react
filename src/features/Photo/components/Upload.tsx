import { PhotoCamera } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import * as React from "react";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from 'react-toastify';

export interface IAppProps {
  open: boolean;
  onClose?: () => void;
  onUpload?: (file: File) => void;
}

const Upload = ({ open, onClose, onUpload }: IAppProps) => {
  const [file, setFile] = React.useState<any>(null);
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFile(file);
  };

  const removeImage = () => {
    setFile(null);
  };

  const handleUpload = () =>{
    if(file){
        onUpload && onUpload(file);
        setFile(null);
    }else{
        toast.error('🦄 Chưa chọn hình ảnh', {autoClose: 5000});
    }
  }

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
          {file?.preview ? (
            <Box
              sx={{
                display: "flex",
                maxWidth: "100%",
                maxHeight: "700px",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <IconButton
                color="error"
                component="span"
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
                onClick={removeImage}
              >
                <ClearIcon />
              </IconButton>
              <img
                src={file.preview}
                srcSet={file.preview}
                alt={"preview"}
                loading="lazy"
                style={{ maxWidth: "100%" }}
              />
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
            >
              <label htmlFor="image">
                <input
                  accept="image/*"
                  id="image"
                  type="file"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  ref={ref}
                />
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonPrimary onClick={onClose}>Thoát</ButtonPrimary>
          <ButtonPrimary onClick={handleUpload}>Tải lên</ButtonPrimary>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(Upload);
