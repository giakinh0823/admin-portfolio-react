import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import { useUpload } from "../../../hooks/photo/useUpload";
import ListImageBlog from "./ListImageBlog";
import Upload from "./Upload";
import Checkbox from "@mui/material/Checkbox";

export interface IShowListImageProps {
  open: boolean;
  handleClose: () => void;
  handleChangeImage: any;
}

export default function ShowListImage({
  open,
  handleClose,
  handleChangeImage,
}: IShowListImageProps) {
  const ListPhotoRef = React.useRef<any>(null);
  const [selected, setSelected] = React.useState<boolean>(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const mutationUpload = useUpload();
  const toastId = React.useRef<any>(null);

  const handleRemove = React.useCallback(() => {
    ListPhotoRef.current.handleButton();
  }, []);

  const handleChekbox = React.useCallback((e: any) => {
    setSelected(e.target.checked);
  }, []);

  const handleChangeSelect = React.useCallback((checked: boolean) => {
    setSelected(checked);
  }, []);

  const handleRemoveSelect = React.useCallback(() => {
    ListPhotoRef.current.handleRemoveSelectAll();
  }, []);

  const handleChooseImage = React.useCallback(() => {
    ListPhotoRef.current.hanldeChooseImage();
    handleClose();
  }, [handleClose]);

  const handleUpload = React.useCallback(
    async (file: File) => {
      toastId.current = toast("🦄 Đang upload hình ảnh", { autoClose: false });
      try {
        await mutationUpload.mutateAsync({ file: file });
        toast.update(toastId.current, {
          render: "🦄 Upload thành công",
          autoClose: 5000,
          type: toast.TYPE.SUCCESS,
        });
      } catch (error) {
        toast.update(toastId.current, {
          render: "🦄 Upload không thành công",
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }
    },
    [mutationUpload]
  );

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
        scroll="body"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" justifyContent="space-between">
            <Box>{"Upload hình ảnh"}</Box>
            <Stack direction="row">
              <Box sx={{ marginRight: "20px" }}>
                <Checkbox onChange={handleChekbox} checked={selected} />
                <Box component="span" sx={{ margin: 0, fontSize: "16px" }}>
                  Select All
                </Box>
              </Box>
              <ButtonPrimary
                onClick={handleRemoveSelect}
                sx={{ marginRight: "20px" }}
              >
                Xóa các lựa chọn
              </ButtonPrimary>
              <ButtonPrimary
                onClick={handleRemove}
                sx={{ marginRight: "20px" }}
              >
                Xóa hình ảnh
              </ButtonPrimary>
              <ButtonPrimary
                onClick={handleChooseImage}
                sx={{ marginRight: "20px" }}
              >
                Chọn hình ảnh
              </ButtonPrimary>
              <ButtonPrimary
                onClick={() => setOpenUpload(true)}
                sx={{ marginRight: "20px" }}
              >
                Up load
              </ButtonPrimary>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ minWidth: "500px" }}>
          <ListImageBlog
            handleChangeImage={handleChangeImage}
            selected={selected}
            handleChangeSelect={handleChangeSelect}
            ref={ListPhotoRef}
          />
        </DialogContent>
        <DialogActions>
          <ButtonPrimary onClick={handleClose}>Thoát</ButtonPrimary>
        </DialogActions>
      </Dialog>
      <Upload
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onUpload={handleUpload}
      />
    </Box>
  );
}
