import { Box, Stack } from "@mui/material";
import * as React from "react";
import Header from "../components/Header";
import ListPhoto from "../components/ListPhoto";

export interface IPhotoProps {}

export default function Photo(props: IPhotoProps) {
  const ListPhotoRef = React.useRef<any>(null);
  const [selected, setSelected] = React.useState<boolean>(false);

  const handleRemove = React.useCallback(() => {
    ListPhotoRef.current.handleButton();
  }, []);

  const handleChekbox = React.useCallback((e: any) => {
    setSelected(e.target.checked);
  }, []);

  const handleChangeSelect = React.useCallback((checked: boolean) => {
    setSelected(checked);
  },[])

  const handleRemoveSelect = React.useCallback(() => {
    ListPhotoRef.current.handleRemoveSelectAll();
  }, [])

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Stack width="100%">
        <Box component="div" sx={{ width: "100%" }}>
          <Header handleRemove={handleRemove} handleChekbox={handleChekbox} selected={selected} handleRemoveSelect={handleRemoveSelect}/>
        </Box>
        <Box sx={{ padding: "30px 0" }}>
          <ListPhoto selected={selected} ref={ListPhotoRef} handleChangeSelect={handleChangeSelect}/>
        </Box>
      </Stack>
    </Box>
  );
}
