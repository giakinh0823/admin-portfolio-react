import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import * as React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import DialogConfirm from "../../../components/dialog/DialogConfirm";
import CrcularProgress from "../../../components/progress/CrcularProgress";
import { useDeletePhoto } from "../../../hooks/photo/useDeltePhoto";
import usePhotos from "../../../hooks/photo/usePhotos";
import { useRemovePhoto } from "../../../hooks/photo/useRemovePhoto";
import ImagePreview from "./ImagePreview";

export interface IListPhotoProps {
  selected: boolean;
  handleChangeSelect: (selected: boolean) => void;
}

const InputCheckbox = React.memo(
  ({ control, setValue, selected, removeSelected, id }: any) => {
    React.useEffect(() => {
      if (selected) {
        setValue(`photos[${id}]`, selected);
      }
    }, [selected, setValue, id]);

    React.useEffect(() => {
      if (removeSelected) {
        setValue(`photos[${id}]`, false);
      }
    }, [removeSelected, setValue, id]);

    return (
      <Controller
        control={control}
        name={`photos[${id}]`}
        defaultValue={selected}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => {
          return (
            <Checkbox
              color="primary"
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e);
              }}
              checked={value}
              inputRef={ref}
              sx={{
                position: "absolute",
                top: 0,
                left: "10px",
                color: "white",
                zIndex: 1,
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
          );
        }}
      />
    );
  }
);

const ListPhoto = (
  { selected, handleChangeSelect }: IListPhotoProps,
  ref: any
) => {
  const { data, isLoading } = usePhotos({ ordering: "-id" });
  const buttonRef = React.useRef<any>(null);
  const { control, setValue, handleSubmit } = useForm();
  const listCheck = useWatch({ control, name: `photos` });
  const toastId = React.useRef<any>(null);
  const mutationRemove = useRemovePhoto();
  const mutationDelete = useDeletePhoto();
  const [open, setOpen] = React.useState<any>(false);
  const [image, setImage] = React.useState<any>(null);
  const [openConfirmRemoveAll, setOpenConfirmRemoveAll] =
    React.useState<any>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState<any>(false);
  const [dataNeedRemove, setDataNeedRemove] = React.useState<any>(null);

  // Check select remove all c?? ???????c checked hay kh??ng
  React.useEffect(() => {
    if (listCheck) {
      const quantity = listCheck.reduce(
        (quantity: number, item: any, index: number) => {
          if (item) {
            return quantity + 1;
          } else {
            return quantity;
          }
        },
        0
      );
      if (quantity === data?.length) {
        handleChangeSelect(true);
      } else {
        handleChangeSelect(false);
      }
    }
  }, [listCheck, data, handleChangeSelect]);

  // Truy???n function cho father ????? g???i 2 h??m handleButton, handleRemoveSelectAll
  React.useImperativeHandle(
    ref,
    () => ({
      handleButton: () => {
        buttonRef.current.click();
      },
      handleRemoveSelectAll: () => {
        if (data) {
          data.forEach((item: any) => {
            setValue(`photos[${item.id}]`, false);
          });
        }
      },
    }),
    [data, setValue]
  );

  // M??? dialog review h??nh ???nh
  const onClose = () => {
    setOpen(false);
  };

  const onOpen = (image: any) => {
    setImage(image);
    setOpen(true);
  };

  // Update checkbox sau khi x??a b???t k?? h??nh ???nh
  const updateAfterRemove = React.useCallback(() => {
    if (data) {
      data.forEach((item: any) => {
        setValue(`photos[${item.id}]`, false);
      });
    }
  }, [data, setValue]);

  // X??? l?? x??a m???t h??nh ???nh
  const handleDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = React.useCallback(() => {
    onClose();
    setOpenConfirmDelete(false);
    (async () => {
      toastId.current = toast("???? ??ang x??a h??nh ???nh", { autoClose: false });
      try {
        if (image) {
          await mutationDelete.mutateAsync(image.id);
          updateAfterRemove();
          toast.update(toastId.current, {
            render: "???? X??a h??nh ???nh th??nh c??ng",
            autoClose: 5000,
            type: toast.TYPE.SUCCESS,
          });
        } else {
          toast.update(toastId.current, {
            render: "???? Xin vui l??ng ch???n h??nh ???nh",
            autoClose: 5000,
            type: toast.TYPE.WARNING,
          });
        }
      } catch (e) {
        toast.update(toastId.current, {
          render: "???? X??a h??nh ???nh th???t b???i",
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }
    })();
  }, [image, mutationDelete, updateAfterRemove]);

  // X??? l?? x??a nhi???u h??nh ???nh c??ng m???t l??c
  const onSubmit = (data: any) => {
    setOpenConfirmRemoveAll(true);
    setDataNeedRemove(data);
  };

  const handleConfimRemoveALl = React.useCallback(() => {
    (async () => {
      toastId.current = toast("???? ??ang x??a h??nh ???nh", { autoClose: false });
      try {
        if (dataNeedRemove.photos) {
          const dataRemove = dataNeedRemove.photos.reduce(
            (dataRemove: any, item: any, index: number) => {
              if (item) {
                dataRemove.push({ id: index });
              }
              return dataRemove;
            },
            []
          );
          await mutationRemove.mutateAsync(dataRemove);
          updateAfterRemove();
          toast.update(toastId.current, {
            render: "???? X??a h??nh ???nh th??nh c??ng",
            autoClose: 5000,
            type: toast.TYPE.SUCCESS,
          });
          setOpenConfirmRemoveAll(false);
        } else {
          toast.update(toastId.current, {
            render: "???? Xin vui l??ng ch???n h??nh ???nh",
            autoClose: 5000,
            type: toast.TYPE.WARNING,
          });
        }
      } catch (e) {
        toast.update(toastId.current, {
          render: "???? X??a h??nh ???nh th???t b???i",
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }
    })();
  }, [mutationRemove, updateAfterRemove, dataNeedRemove]);

  return (
    <>
      {isLoading && (
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
      )}
      {!isLoading && (
        <>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              {data && (
                <ImageList
                  variant="standard"
                  gap={12}
                  sx={{
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)!important",
                      md: "repeat(2, 1fr)!important",
                      lg: "repeat(4, 1fr)!important",
                      xl: "repeat(6, 1fr)!important",
                    },
                  }}
                >
                  {data.map((item: any, index: number) => (
                    <ImageListItem
                      key={index}
                      sx={{
                        borderRadius: "30px",
                        overflow: "hidden",
                        position: "relative",
                        "&:hover": {
                          cursor: "pointer",
                          "& img": {
                            transform: "scale(1.1)",
                            transition: "all 0.3s ease-in-out",
                          },
                          "& svg": {
                            display: "block",
                          },
                        },
                      }}
                    >
                      <img
                        src={`${item.url}`}
                        alt={item.title}
                        loading="lazy"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <CenterFocusStrongIcon
                        sx={{
                          display: "none",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          fontSize: "3rem",
                          color: "white",
                          transform: "translate(-50%, -50%)",
                          transition: "all 0.5s linear",
                        }}
                        onClick={() => onOpen(item)}
                      />
                      <InputCheckbox
                        id={item.id}
                        selected={selected}
                        control={control}
                        setValue={setValue}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
              <input
                type="submit"
                style={{ display: "none" }}
                ref={buttonRef}
              />
            </form>
          </Box>
        </>
      )}
      <ImagePreview
        image={image}
        onClose={onClose}
        open={open}
        handleRemove={handleDelete}
      />
      <DialogConfirm
        message={"B???n c?? ch???c ch???n mu???n x??a t???t c??? c??c h??nh n??y?"}
        open={openConfirmRemoveAll}
        title={"X??a h??nh ???nh"}
        handleConfirm={handleConfimRemoveALl}
        handleClose={() => setOpenConfirmRemoveAll(false)}
      />
      <DialogConfirm
        message={"B???n c?? ch???c ch???n mu???n x??a h??nh n??y?"}
        open={openConfirmDelete}
        title={"X??a h??nh ???nh"}
        handleConfirm={handleConfirmDelete}
        handleClose={() => setOpenConfirmDelete(false)}
      />
    </>
  );
};

export default React.forwardRef(ListPhoto);
