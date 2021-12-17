import * as React from "react";
import { Box, Stack } from "@mui/material";
import Header from "../components/Header";
import ListPhoto from "../components/ListPhoto";

export interface IPhotoProps {}

export default function Photo(props: IPhotoProps) {
  const buttonRef = React.useRef<any>(null);

  const handleRemove = () => {
    buttonRef.current.handleButton();
    console.log(buttonRef)
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Stack width="100%">
        <Box component="div" sx={{ width: "100%" }}>
          <Header handleRemove={handleRemove} />
        </Box>
        <Box sx={{ padding: "30px 0" }}>
          <ListPhoto ref={buttonRef} />
        </Box>
      </Stack>
    </Box>
  );
}
