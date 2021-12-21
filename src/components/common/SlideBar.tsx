import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/system";
import * as React from "react";
import { NavLink } from "react-router-dom";
import avatarImage from "../../assets/images/avatar.jpg";
import { ROUTER_LIST } from "./ROUTER_LIST";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";

export interface SidebarProps {
  showSlideBar: boolean;
  onCloseShowSlide?: any;
}

const Sidebar = ({ showSlideBar, onCloseShowSlide }: SidebarProps) => {
  return (
    <>
      <Drawer
        open={showSlideBar}
        variant="persistent"
        onClose={() => onCloseShowSlide()}
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          position: {
            xs: "fixed",
            md: "relative",
          },

          width: showSlideBar ? "280px" : 0,
          backgroundColor: "white",
          zIndex: (theme: any) => ({
            xs: theme.zIndex.drawer + 2,
            md: 1,
          }),
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: showSlideBar ? "280px" : 0,
            backgroundColor: "white",
            borderRight: "0.1px solid #e8e8e8",
            boxShadow: {
              xs: "rgba(149, 157, 165, 0.5) 0px 8px 24px",
              md: "none",
            },
          },
        }}
      >
        <Box>
          <Box
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <CloseIcon
              sx={{ fontSize: "30px", color: "#000" }}
              onClick={onCloseShowSlide}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }} mt={10}>
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
              sx={{
                color: "#333",
              }}
            >
              Hà Gia Kính
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              textAlign="center"
              fontSize="14px"
              sx={{
                color: "#333",
              }}
            >
              Code để thành công
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 20px",
          }}
        >
          {ROUTER_LIST.map((item, index) => {
            return (
              <Box
                key={index}
                component="div"
                sx={{
                  margin: "4px 0",
                  transition: "all 0.3s ease",
                }}
              >
                <NavLink
                  style={({ isActive }) => {
                    return {
                      display: "block",
                      textDecoration: "none",
                      color: isActive ? "#3766f4" : "#333",
                      fontWeight: "bold",
                      backgroundColor: isActive ? "rgb(55 102 244 / 10%)": undefined,
                      padding: "15px 50px",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "rgb(55 102 244 / 10%)",
                      },
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
      <Backdrop
        open={showSlideBar}
        sx={{
          color: "#fff",
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
          display: { xs: showSlideBar ? "block" : "none", md: "none" },
        }}
        onClick={onCloseShowSlide}
      />
    </>
  );
};

export default React.memo(Sidebar);
