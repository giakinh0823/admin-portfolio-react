import * as React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useCreateTopic } from "../../../hooks/topic/useCreateTopic";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export interface ICreateTopicProps {}

export default function CreateTopic(props: ICreateTopicProps) {
  const { register, handleSubmit } = useForm();
  const toastId = React.useRef<any>(null);
  const mutation = useCreateTopic();
  let navigate = useNavigate();
  const onSubmit = (data: any) => {
    (async () => {
      toastId.current = toast("🦄 Đang tạo topic", { autoClose: false });
      try {
        await mutation.mutateAsync(data);
        toast.update(toastId.current, {
          render: "🦄 Tạo topic thành công",
          autoClose: 5000,
          type: toast.TYPE.SUCCESS,
        });
        navigate("/topics");
      } catch (e) {
        toast.update(toastId.current, {
          render: "🦄Tạo topic thất bại",
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }
    })();
  };
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
          mb={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box>
            <Link to={`/topics`}>
              <IconButton>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Link>
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="topic"
            label="Name"
            variant="standard"
            fullWidth
            {...register("name", { required: true })}
          />
          <Box sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "flex-end",
          }}>
            <ButtonPrimary type="submit">Tạo topic</ButtonPrimary>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
