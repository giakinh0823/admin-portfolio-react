import { Box } from "@mui/material";
import * as React from "react";
import dashboard from "../../../assets/images/dashboard.webp";
import Typography from '@mui/material/Typography';

export interface IDashBoardProps {}

export default function DashBoard(props: IDashBoardProps) {
  return (
    <Box
      sx={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Box mb={6}>
          <Typography variant="h3" component="h1" textAlign="center">Dashboard</Typography>
        </Box>
        <Box
          sx={{
            maxHeight: "400px",
            maxWidth: "400px",
            borderRadius: "50px",
            overflow: "hidden",
          }}
        >
          <img
            src={dashboard}
            alt="dashboard"
            style={{ width: "100%", height: "100" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
