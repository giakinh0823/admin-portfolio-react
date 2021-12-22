import { Box } from "@mui/material";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBlog from "../../features/Blog/pages/createBlog";
import EditBlog from "../../features/Blog/pages/editBlog";
import Blog from "../../features/Blog/pages/index";
import TrashBlog from "../../features/Blog/pages/trashBlog";
import DashBoard from "../../features/Dashboard/pages";
import Photo from "../../features/Photo/page";
import Tag from "../../features/Tag/pages";
import CreateTag from "../../features/Tag/pages/CreateTag";
import EditTag from "../../features/Tag/pages/EditTag";
import TrashTag from "../../features/Tag/pages/trashTag";
import CreateTopic from "../../features/Topic/pages/CreateTopic";
import EditTopic from "../../features/Topic/pages/EditTopic";
import Topic from "../../features/Topic/pages/index";
import TrashTopic from "../../features/Topic/pages/trashTopic";
import { Header } from "../common/Header";
import { NotFound } from "../common/NotFound";
import Sidebar from "../common/SlideBar";

export function AdminLayout() {
  const [showSlideBar, setShowSlideBar] = React.useState(true);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Box component="div">
        <Sidebar
          showSlideBar={showSlideBar}
          onCloseShowSlide={() => setShowSlideBar(false)}
        />
      </Box>
      <Box component="main" sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Header onChangeShowSlide={() => setShowSlideBar(!showSlideBar)} />
        </Box>
        <Box component="div" p={3} sx={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/create" element={<CreateBlog />} />
            <Route path="/blogs/trash" element={<TrashBlog />} />
            <Route path="/blogs/:slug" element={<EditBlog />} />
            <Route path="/topics" element={<Topic />} />
            <Route path="/topics/create" element={<CreateTopic />} />
            <Route path="/topics/trash" element={<TrashTopic />} />
            <Route path="/topics/:slug" element={<EditTopic />} />
            <Route path="/tags" element={<Tag />} />
            <Route path="/tags/trash" element={<TrashTag />} />
            <Route path="/tags/create" element={<CreateTag />} />
            <Route path="/tags/:id" element={<EditTag />} />
            <Route path="/photos" element={<Photo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
