import * as React from "react";
import { Box } from "@mui/system";
import FormLogin from "../components/FormLogin";

export interface IAppProps {}

export default function AuthPage(props: IAppProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormLogin />
    </Box>
  );
}
