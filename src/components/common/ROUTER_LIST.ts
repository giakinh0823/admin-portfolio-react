import BookIcon from "@mui/icons-material/Book";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TopicIcon from "@mui/icons-material/Topic";
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';

export const ROUTER_LIST = [
  {
    path: "/",
    name: "Dashboard",
    icon: FlutterDashIcon,
  },
  {
    path: "/blogs",
    name: "Blogs",
    icon: BookIcon,
  },
  {
    path: "/topics",
    name: "Topics",
    icon: TopicIcon,
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
