import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import * as React from "react";
import { toast } from "react-toastify";
import { useUpload } from "../../../hooks/photo/useUpload";
import Upload from "./Upload";

export interface IHeaderProps {
  handleRemove: () => void;
  selected: boolean;
  handleChekbox: (e: any) => void;
}

const Header = ({
  handleRemove,
  handleChekbox,
  selected,
}: IHeaderProps) => {
  const [open, setOpen] = React.useState(false);
  const mutation = useUpload();
  const toastId = React.useRef<any>(null);

  const handleClickOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleUpload = React.useCallback(
    async (file: File) => {
      toastId.current = toast("🦄 Đang upload hình ảnh", { autoClose: false });
      try {
        await mutation.mutateAsync({ file: file });
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
    [mutation]
  );

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid #e5e5e5",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
        padding: "20px 0",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        width="100%"
        px={6}
        spacing={3}
        sx={{
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Stack direction="row" alignItems="center">
              <Checkbox onChange={handleChekbox} checked={selected} />
              <Box component="span" sx={{ margin: 0, minWidth: "70px" }}>
                Select All
              </Box>
            </Stack>
            <Box>
              <IconButton color="primary"
                onClick={() => handleRemove()}
              >
                <DeleteOutlineOutlinedIcon/>
              </IconButton>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Box>
            <IconButton color="primary" onClick={() => handleClickOpen()}>
              <CloudUploadOutlinedIcon/>
            </IconButton>
          </Box>
        </Box>
      </Stack>
      <Upload open={open} onClose={handleClose} onUpload={handleUpload} />
    </Box>
  );
};

export default React.memo(Header);
