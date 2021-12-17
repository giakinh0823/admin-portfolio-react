import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import { useUpload } from "../../../hooks/useUpload";
import Upload from "./Upload";
export interface IHeaderProps {
  handleRemove: () => void;
}

const Header = ({handleRemove}: IHeaderProps) => {
  const [open, setOpen] = React.useState(false);
  const mutation = useUpload();
  const toastId = React.useRef<any>(null);

  const handleClickOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleUpload = async (file: File) => {
    toastId.current = toast("🦄 Đang upload hình ảnh", { autoClose: false });
    try {
      const image = await mutation.mutateAsync({ file: file });
      console.log(image);
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
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        borderBottom: "1px solid #e5e5e5",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        width="100%"
        px={6}
      >
        <Box>
          <Box>
            <ButtonPrimary onClick={() => handleRemove()}>
              Remove
            </ButtonPrimary>
          </Box>
        </Box>
        <Box>
          <Box>
            <ButtonPrimary onClick={() => handleClickOpen()}>
              Upload
            </ButtonPrimary>
          </Box>
        </Box>
      </Stack>
      <Upload open={open} onClose={handleClose} onUpload={handleUpload} />
    </Box>
  );
};

export default React.memo(Header);
