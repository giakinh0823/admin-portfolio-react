import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import * as React from "react";
import { useForm } from "react-hook-form";
import CrcularProgress from "../../../components/progress/CrcularProgress";
import usePhotos from "../../../hooks/usePhotos";

export interface IListPhotoProps {}

const ListPhoto = (props: IListPhotoProps, ref: any) => {
  const { data, isLoading } = usePhotos({ ordering: "-id" });
  const buttonRef = React.useRef<any>(null);

  React.useImperativeHandle(
    ref,
    () => ({
      handleButton,
    }),
    []
  );

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleButton = () => {
    buttonRef.current.click();
  };  

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
                <ImageList variant="standard" cols={6} gap={12}>
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
                      <Checkbox
                        color="primary"
                        {...register(`photo[${item.id}]`)}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: "10px",
                          color: "white",
                        }}
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
