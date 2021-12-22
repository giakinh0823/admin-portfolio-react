import { Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import CrcularProgress from "../../../components/progress/CrcularProgress";
import useTag from "../../../hooks/tag/useTag";
import useUpdateTag from "../../../hooks/tag/useUpdateTag";

export interface ICreateTagProps {}

export default function EditTag(props: ICreateTagProps) {
  const { id } = useParams();
  const { data, isLoading } = useTag(id);
  const [tag, setTag] = React.useState<any>(data);
  const { register, handleSubmit } = useForm();
  const toastId = React.useRef<any>(null);
  const mutation = useUpdateTag();
  let navigate = useNavigate();

  React.useEffect(() => {
    setTag(data);
  }, [data]);

  const onSubmit = (data: any) => {
    (async () => {
      toastId.current = toast("🦄 Đang cập nhật tag", { autoClose: false });
      try {
        await mutation.mutateAsync({ ...tag, name: data.name });
        toast.update(toastId.current, {
          render: "🦄 Cập nhật tag thành công",
          autoClose: 5000,
          type: toast.TYPE.SUCCESS,
        });
        navigate("/tags");
      } catch (e) {
        toast.update(toastId.current, {
          render: "🦄 Cập nhật tag thất bại",
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }
    })();
  };

  const handleChangePublic = (e: any) => {
    const isPublic = e.target.checked;
    (async () => {
      toastId.current = toast("🦄 Đang cập nhật tag", { autoClose: false });
      try {
        await mutation.mutateAsync({ ...tag, is_public: isPublic });
        toast.update(toastId.current, {
          render: "🦄 Cập nhật tag thành công",
          autoClose: 1000,
          type: toast.TYPE.SUCCESS,
        });
      } catch (e) {
        toast.update(toastId.current, {
          render: "🦄 Cập nhật tag thất bại",
          autoClose: 1000,
          type: toast.TYPE.ERROR,
        });
      }
    })();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CrcularProgress />
      </Box>
    );
  }

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Box
        sx={{
          minHeight: "300px",
          width: "100%",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "30px",
          padding: "40px 50px",
        }}
      >
        <Box
          mb={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box component="span">Public</Box>
          <Switch
            defaultChecked={data?.is_public}
            onChange={handleChangePublic}
          />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {data && (
            <TextField
              id="Tag"
              label="Name"
              variant="standard"
              fullWidth
              defaultValue={data?.name}
              {...register("name", { required: true })}
            />
          )}

          <Box
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ButtonPrimary type="submit">Cập nhật Tag</ButtonPrimary>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
