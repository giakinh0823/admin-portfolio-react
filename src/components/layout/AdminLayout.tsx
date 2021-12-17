import { Box, Stack } from "@mui/material";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../../features/Blog/pages/index";
import DashBoard from "../../features/Dashboard/pages";
import Photo from "../../features/Photo/page";
import Topic from "../../features/Topic/pages/index";
import { Header } from "../common/Header";
import { NotFound } from "../common/NotFound";
import Sidebar from "../common/SlideBar";

export function AdminLayout() {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Stack direction="row">
        <Box>
          <Sidebar />
        </Box>
        <Box component="div" p={3} sx={{width: "100%"}}>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/topics" element={<Topic />} />
            <Route path="/photos" element={<Photo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Stack>
    </Box>
  );
}
