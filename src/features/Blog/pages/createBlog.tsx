import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import SelectMultiChip from "../../../components/select/SelectMultiChip";
import { useCreateBlog } from "../../../hooks/blog/useCrateBlog";
import usePhotos from "../../../hooks/photo/usePhotos";
import useTags from "../../../hooks/tag/useTags";
import useTopics from "../../../hooks/topic/useTopics";
import ShowListImage from "../components/ShowListImage";

export interface ICreateBlogProps {}

export default function CreateBlog(props: ICreateBlogProps) {
  const form = useForm();
  const { register, handleSubmit } = form;
  const photos = usePhotos({ ordering: "-id" });
  const tags = useTags({});
  const topics = useTopics({});
  const [showImage, setShowImage] = React.useState(false);
  const [imageId, setImageId] = React.useState<any>();
  const [imagePreviw, setImagePreview] = React.useState<any>();
  const toastId = React.useRef<any>(null);
  const mutation = useCreateBlog();
  let navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (data) {
      const newData = {
        ...data,
        tags: data?.tags?.map((item: any) => item.value),
        topics: data?.topics?.map((item: any) => item.value),
        image: imageId ? imageId : undefined,
        author: 1,
      }
      ;(async () => {
        toastId.current = toast("🦄 Đang tạo topic", { autoClose: false });
        try {
          await mutation.mutateAsync(newData);
          toast.update(toastId.current, {
            render: "🦄 Tạo topic thành công",
            autoClose: 5000,
            type: toast.TYPE.SUCCESS,
          });
          form.reset();
          setImageId(undefined);
          setImagePreview(undefined);
          navigate("/blogs");
        } catch (e) {
          toast.update(toastId.current, {
            render: "🦄Tạo topic thất bại",
            autoClose: 5000,
            type: toast.TYPE.ERROR,
          });
        }
      })();
    }
  };

  React.useEffect(() => {
    if (photos.data && imageId) {
      const image = photos?.data?.find((photo: any) => photo.id === imageId);
      setImagePreview(image);
    }
  }, [photos, imageId]);

  const handleChangeImage = React.useCallback((imageId: number) => {
    if (imageId) {
      setImageId(imageId);
    }
  }, []);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <TextField
              label="Title"
              variant="standard"
              fullWidth
              {...register("title", { required: true })}
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Description"
              variant="standard"
              fullWidth
              multiline
              rows={3}
              {...register("description", { required: true })}
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Content"
              variant="standard"
              fullWidth
              multiline
              rows={10}
              {...register("content", { required: true })}
            />
          </Box>
          <Box mb={3}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              sx={{
                flexWrap: "wrap",
              }}
            >
              <SelectMultiChip
                name="topics"
                label="Topics"
                required={true}
                options={
                  topics?.data
                    ? topics?.data?.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
                form={form}
              />
              <SelectMultiChip
                required={true}
                name="tags"
                label="Tags"
                options={
                  tags?.data
                    ? tags?.data?.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
                form={form}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box sx={{ maxWidth: "500px", mb: 3, position: "relative" }}>
              {imagePreviw && (
                <img src={imagePreviw?.url} alt="" style={{ width: "100%" }} />
              )}
              <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
                <IconButton
                  onClick={() => {
                    setImageId(undefined);
                    setImagePreview(undefined);
                  }}
                >
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box mb={3} mx={1}>
            <ButtonPrimary onClick={() => setShowImage(true)}>
              <AddPhotoAlternateIcon /> chọn hình ảnh
            </ButtonPrimary>
            <ShowListImage
              open={showImage}
              handleClose={() => setShowImage(false)}
              handleChangeImage={handleChangeImage}
            />
          </Box>
          <Box
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ButtonPrimary type="submit">Tạo Blog</ButtonPrimary>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
