import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import { authActions, selectIsLoggedIn } from '../authSlice';
import { Navigate } from "react-router-dom";

export interface IFormLoginProps {}

export default function FormLogin(props: IFormLoginProps) {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const islogin = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if(localStorage.getItem('access_token')){
      dispatch(authActions.getUser())
    }
  }, [islogin, dispatch])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    dispatch(authActions.login(data));
  };


  if(islogin) {
    return <Navigate to="/"/> 
  }

  return (
    <Box
      sx={{
        width: "600px",
        height: "600px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "40px 60px",
        borderRadius: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box mb={8}>
        <Typography variant="h3" textAlign="center" mb={2}>Hà Gia Kính</Typography>
        <Typography variant="body1" textAlign="center">Đăng nhập</Typography>
      </Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box mb={5}>
          <TextField
            {...register("username", { required: true })}
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mb={4}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              fullWidth
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <ButtonPrimary sx={{ margin: "0 auto" }} type="submit">
          Đăng nhập
        </ButtonPrimary>
      </form>
    </Box>
  );
}
