import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import * as React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import CrcularProgress from "../../../components/progress/CrcularProgress";
import usePhotos from "../../../hooks/usePhotos";
import { useRemovePhoto } from "../../../hooks/useRemovePhoto";
import { toast } from "react-toastify";

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
  const mutation = useRemovePhoto();

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

  const updateAfterRemove = React.useCallback(() => {
    if (data) {
      data.forEach((item: any) => {
        setValue(`photos[${item.id}]`, false);
      });
    }
  }, [data, setValue]);

  const onSubmit = React.useCallback(
    (data: any) => {
      (async () => {
        toastId.current = toast("🦄 Đang xóa hình ảnh", { autoClose: false });
        try {
          if (data.photos) {
            const dataRemove = data.photos.reduce(
              (dataRemove: any, item: any, index: number) => {
                if (item) {
                  dataRemove.push({ id: index });
                }
                return dataRemove;
              },
              []
            );
            await mutation.mutateAsync(dataRemove);
            updateAfterRemove();
            toast.update(toastId.current, {
              render: "🦄 Xóa hình ảnh thành công",
              autoClose: 5000,
              type: toast.TYPE.SUCCESS,
            });
          } else {
            toast.update(toastId.current, {
              render: "🦄 Xin vui lòng chọn hình ảnh",
              autoClose: 5000,
              type: toast.TYPE.WARNING,
            });
          }
        } catch (e) {
          toast.update(toastId.current, {
            render: "🦄 Xóa hình ảnh thất bại",
            autoClose: 5000,
            type: toast.TYPE.ERROR,
          });
        }
      })();
    },
    [mutation, updateAfterRemove]
  );

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
          <Box
            sx={{
              height: "80vh",
              overflowY: "auto",
            }}
          >
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
    </>
  );
};

export default React.forwardRef(ListPhoto);
