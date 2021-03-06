import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import notfound from "../../assets/images/notfound.webp";
export interface NotFoundProps {}

export function NotFound(props: NotFoundProps) {
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
          <Typography variant="h3" component="h1" textAlign="center">
            Not Found
          </Typography>
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
            src={notfound}
            alt="dashboard"
            style={{ width: "100%", height: "100" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
