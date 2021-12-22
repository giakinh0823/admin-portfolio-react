import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import clsx from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import CrcularProgress from "../../../components/progress/CrcularProgress";
import SelectMultiChip from "../../../components/select/SelectMultiChip";
import useBlog from "../../../hooks/blog/useBlog";
import { useUpdateBlog } from "../../../hooks/blog/useUpdateBlog";
import usePhotos from "../../../hooks/photo/usePhotos";
import useTags from "../../../hooks/tag/useTags";
import useTopics from "../../../hooks/topic/useTopics";
import PreviewContent from "../components/PreviewContent";
import ShowListImage from "../components/ShowListImage";
import Switch from "@mui/material/Switch";

export interface ICreateBlogProps {}

export default function EditBlog(props: ICreateBlogProps) {
  const { slug } = useParams();
  const { data, isLoading } = useBlog(slug);
  const form = useForm({
    defaultValues: {
      title: data?.title,
      description: data?.description,
      content: data?.content,
      tags: data?.tags,
      topics: data?.topics,
      image: data?.image,
      author: data?.author,
    },
  });
  const { register, handleSubmit } = form;
  const photos = usePhotos({ ordering: "-id" });
  const tags = useTags({});
  const topics = useTopics({});
  const [showImage, setShowImage] = React.useState(false);
  const [imageId, setImageId] = React.useState<any>();
  const [imagePreviw, setImagePreview] = React.useState<any>();
  const [content, setContent] = React.useState<any>();
  const toastId = React.useRef<any>(null);
  const mutation = useUpdateBlog();
  const [openPreviewContent, setOpenPreviewContent] =
    React.useState<boolean>(false);

  let navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      setImageId(data?.image?.id);
      setContent(data?.content);
    }
  }, [data]);

  const onSubmit = (datas: any) => {
    if (datas) {
      const newData = {
        ...datas,
        content: content ? content : "",
        tags: datas?.tags?.map((item: any) => item.value || item.id),
        topics: datas?.topics?.map((item: any) => item.value || item.id),
        image: imageId ? imageId : "",
        author: 1,
        id: data?.id,
      };
      (async () => {
        toastId.current = toast("🦄 Đang cập nhật blog", { autoClose: false });
        try {
          await mutation.mutateAsync(newData);
          toast.update(toastId.current, {
            render: "🦄 Cập nhật blog thành công",
            autoClose: 5000,
            type: toast.TYPE.SUCCESS,
          });
          form.reset();
          setImageId(undefined);
          setImagePreview(undefined);
          navigate("/blogs");
        } catch (e) {
          toast.update(toastId.current, {
            render: "🦄 Cập nhật blog thất bại",
            autoClose: 5000,
            type: toast.TYPE.ERROR,
          });
        }
      })();
    }
  };

  const handleChangePublic = (e: any) => {
    const isPublic = e.target.checked;
    const newData = {
      description: data?.description,
      content: data?.content,
      tags: data?.tags?.map((item: any) => item.value || item.id),
      topics: data?.topics?.map((item: any) => item.value || item.id),
      image: data?.image ? data?.image?.id: undefined,
      author: data?.author ? data?.author.id: undefined,
      id: data?.id,
      is_public: isPublic,
    };
    (async () => {
      toastId.current = toast("🦄 Đang cập nhật blog", { autoClose: false });
      try {
        await mutation.mutateAsync(newData);
        toast.update(toastId.current, {
          render: "🦄 Cập nhật blog thành công",
          autoClose: 5000,
          type: toast.TYPE.SUCCESS,
        });
        form.reset();
        setImageId(undefined);
        setImagePreview(undefined);
      } catch (e) {
        toast.update(toastId.current, {
          render: "🦄 Cập nhật blog thất bại",
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }
    })();
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

  function handleEditorChange({ html, text }: any) {
    setContent(text);
  }

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
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "30px",
          padding: "40px 50px",
          maxWidth: "100%",
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
          <Box mb={3}>
            <TextField
              label="Title"
              variant="standard"
              fullWidth
              defaultValue={data?.title}
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
              defaultValue={data?.description}
              {...register("description", { required: true })}
            />
          </Box>
          <Box
            mb={3}
            sx={{
              "& code": { backgroundColor: "transparent" },
            }}
            className={clsx("content-markdown", "markdown-edit")}
          >
            <MdEditor
              style={{ height: "600px" }}
              value={content}
              renderHTML={(text) => (
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={prism}
                          language={match[1]}
                          PreTag="div"
                          wrapLines={true}
                          showLineNumbers={true}
                          {...props}
                          customStyle={{
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow:
                              "0px 100px 80px rgba(0,0,0,0.0174624),0px 41.7776px 33.4221px rgba(0,0,0,0.0235573),0px 22.3363px 17.869px rgba(0,0,0,0.0282784),0px 12.5216px 10.0172px rgba(0,0,0,0.0339075),0px 6.6501px 5.32008px rgba(0,0,0,0.04317),0px 2.76726px 2.21381px rgba(0,0,0,0.07)",
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {text}
                </ReactMarkdown>
              )}
              onChange={handleEditorChange}
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
                defaultValue={data?.topics.map((topic: any) => ({
                  label: topic?.name,
                  value: topic?.id,
                }))}
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
                defaultValue={data?.tags.map((tag: any) => ({
                  label: tag?.name,
                  value: tag?.id,
                }))}
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
          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            <Box sx={{}}>
              <ButtonPrimary onClick={() => setOpenPreviewContent(true)}>
                Preview
              </ButtonPrimary>
            </Box>
            <Box sx={{}}>
              <ButtonPrimary type="submit">Cập nhật</ButtonPrimary>
            </Box>
          </Stack>
        </form>
      </Box>
      <PreviewContent
        open={openPreviewContent}
        onClose={() => setOpenPreviewContent(false)}
        content={content}
      />
    </Box>
  );
}
