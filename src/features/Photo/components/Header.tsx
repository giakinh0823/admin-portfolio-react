import { Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import * as React from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import { useUpload } from "../../../hooks/photo/useUpload";
import Upload from "./Upload";
export interface IHeaderProps {
  handleRemove: () => void;
  selected: boolean;
  handleRemoveSelect: any;
  handleChekbox: (e: any) => void;
}

const Header = ({
  handleRemove,
  handleChekbox,
  selected,
  handleRemoveSelect,
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
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack direction="row" alignItems="center">
              <Checkbox onChange={handleChekbox} checked={selected} />
              <Box component="span" sx={{ margin: 0 }}>
                Select All
              </Box>
            </Stack>
            <Box>
              <ButtonPrimary
                onClick={() => handleRemoveSelect()}
              >
                Remove Select All
              </ButtonPrimary>
            </Box>
            <Box>
              <ButtonPrimary
                onClick={() => handleRemove()}
                color="error.main"
                darkColor="#e90d37"
                lightColor="#ff2f57"
                boxShadow="rgb(255 23 68 / 30%) 0px 12px 14px 0px"
              >
                Remove
              </ButtonPrimary>
            </Box>
          </Stack>
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
