import { Box, Stack, Typography } from "@mui/material";
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
    if(e.target.checked===false) {
      ListPhotoRef.current.handleRemoveSelectAll();
    }
  }, []);

  const handleChangeSelect = React.useCallback((checked: boolean) => {
    setSelected(checked);
  },[])


  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Stack width="100%">
        <Box>
          <Typography variant="h4" component="h4" fontWeight="600" mb={3}>
            Photos
          </Typography>
        </Box>
        <Box component="div" sx={{ width: "100%" }}>
          <Header handleRemove={handleRemove} handleChekbox={handleChekbox} selected={selected}/>
        </Box>
        <Box sx={{ padding: "30px 0" }}>
          <ListPhoto selected={selected} ref={ListPhotoRef} handleChangeSelect={handleChangeSelect}/>
        </Box>
      </Stack>
    </Box>
  );
}
