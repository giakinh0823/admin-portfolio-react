import { Link as MuiLink, Stack } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <Box py={2} px={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
        <Stack direction="row" alignItems="center"></Stack>
      </Stack>
    </Box>
  );
}
