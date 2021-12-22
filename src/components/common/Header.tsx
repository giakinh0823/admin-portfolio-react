import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link as MuiLink, Stack } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { authActions } from "../../features/Auth/authSlice";
import IconButton from '@mui/material/IconButton';

export interface HeaderProps {
  onChangeShowSlide?: any;
}

export function Header({ onChangeShowSlide }: HeaderProps) {
  const dispatch = useAppDispatch();

  return (
    <Box py={3} px={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Stack direction="row" alignItems="center">
            <Box>
              <IconButton onClick={onChangeShowSlide}>
                <MenuOutlinedIcon
                  sx={{ cursor: "pointer", fontSize: "1.8rem" }}
                />
              </IconButton>
            </Box>
          </Stack>
        </Box>
        <Stack direction="row" alignItems="center">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <MuiLink component="div">
              <Stack direction="row" alignItems="center">
                <Box component="span" sx={{ fontSize: "1.2rem" }}>
                  👋
                </Box>
                <Box sx={{ ml: 1, fontWeight: "bold", fontSize: "1.2rem" }}>
                  Kính G.
                </Box>
              </Stack>
            </MuiLink>
          </Link>
          <Box
            onClick={() => {
              dispatch(authActions.logout());
            }}
            ml={4}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#3766f4",
              },
            }}
          >
            <Stack direction="row" alignItems="center">
              <Box component="span" sx={{ fontSize: "1rem" }}>
                <FaceOutlinedIcon />
              </Box>
              <Box sx={{ ml: 1, fontWeight: "bold", fontSize: "1.2rem" }}>
                out.
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
