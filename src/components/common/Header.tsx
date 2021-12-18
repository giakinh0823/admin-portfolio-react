import { Link as MuiLink, Stack } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../button/ButtonPrimary";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
export interface HeaderProps {
  onChangeShowSlide?: any;
}

export function Header({onChangeShowSlide}: HeaderProps) {
  return (
    <Box py={3} px={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Stack direction="row" alignItems="center">
            <Box>
              <ButtonPrimary onClick={onChangeShowSlide}>
                <MenuOutlinedIcon/>
              </ButtonPrimary>
            </Box>
          </Stack>
        </Box>
        <Box>
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
        </Box>
      </Stack>
    </Box>
  );
}
