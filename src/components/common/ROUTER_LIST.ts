import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import TagIcon from '@mui/icons-material/Tag';


export const ROUTER_LIST = [
  {
    path: "/",
    name: "Dashboard",
    icon: FlutterDashIcon,
  },
  {
    path: "/chatbot",
    name: "Chatbot",
    icon: SmartToyOutlinedIcon,
  },
  {
    path: "/blogs",
    name: "Blogs",
    icon: BookOutlinedIcon,
  },
  {
    path: "/topics",
    name: "Topics",
    icon: TopicOutlinedIcon,
  },
  {
    path: "/tags",
    name: "Tags",
    icon: TagIcon,
  },
  {
    path: "/photos",
    name: "Photos",
    icon: PhotoSizeSelectActualOutlinedIcon,
  },
  {
    path: "/users",
    name: "Users",
    icon: PersonOutlineIcon,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: SettingsOutlinedIcon,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: FolderSharedOutlinedIcon,
  },
];
