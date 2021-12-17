import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/system";
import * as React from "react";
import { NavLink } from "react-router-dom";
import avatarImage from "../../assets/images/avatar.jpg";
import { ROUTER_LIST } from "./ROUTER_LIST";

export interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  return (
    <Drawer
      open
      variant="persistent"
      hideBackdrop={true}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "280px",
          position: "static",
          borderRight: "0.5px solid #e8e8e8",
          minHeight: "95vh",
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={5}>
          <Avatar
            alt="Remy Sharp"
            src={avatarImage}
            sx={{ width: 120, height: 120 }}
          />
        </Box>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            fontWeight="600"
            mb={0}
            mt={3}
          >
            Hà Gia Kính
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            textAlign="center"
            fontSize="14px"
          >
            Code để thành công
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 0",
        }}
      >
        {ROUTER_LIST.map((item, index) => {
          return (
            <Box
              key={index}
              component="div"
              sx={{
                margin: "4px 0",
                padding: "15px 50px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgb(55 102 244 / 10%)",
                },
              }}
            >
              <NavLink
                style={({ isActive }) => {
                  return {
                    display: "block",
                    textDecoration: "none",
                    color: isActive ? "#3766f4" : "#171717",
                    fontWeight: "bold",
                  };
                }}
                to={item.path}
              >
                <Box
                  sx={{
                    display: "flex",
                    fontSize: "1.1rem",
                    alignItems: "center",
                  }}
                >
                  <item.icon />
                  <Box component="span" sx={{ ml: 3 }}>
                    {item.name}
                  </Box>
                </Box>
              </NavLink>
            </Box>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default React.memo(Sidebar);
