import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import {
    Avatar, Badge, Box, IconButton, Stack, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export interface IChatbotCustomerProps {}

export default function InfoUser(props: IChatbotCustomerProps) {
  return (
    <Box
      sx={{
        padding: "20px 10px",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        height: "90vh",
        borderRadius: "20px",
        width: "350px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "10px 30px 0 10px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <IconButton
            sx={{
              borderRadius: "10px",
            }}
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
          <Box>
            <Typography variant="h6">User</Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt="Remy Sharp"
            src="https://res.cloudinary.com/giakinh0823/image/upload/v1640164105/wsomn31zjodit3s350iu.webp"
            sx={{
              width: "150px",
              height: "150px",
            }}
          />
        </StyledBadge>
      </Box>
      <Box>
        <Typography variant="h5" textAlign="center" mt={3}>
          Hà Gia Kính
        </Typography>
      </Box>
    </Box>
  );
}
