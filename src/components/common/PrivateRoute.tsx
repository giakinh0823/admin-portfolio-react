import * as React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../app/hook";
import { authActions } from "../../features/Auth/authSlice";

export default function PrivateRoute({ children, redirectTo }: any) {
  const dispatch =useAppDispatch()
  const isLogged = Boolean(localStorage.getItem("access_token"));
  const navigate = useNavigate();

  const goToLogin = React.useCallback(() => {
    navigate(redirectTo);
  },[navigate, redirectTo]);

  React.useEffect(() => {
    if(isLogged) {
      try{
        dispatch(authActions.getUser())
      }catch(error: any){
        goToLogin()
      }
    }
  },[dispatch, isLogged, goToLogin])

  if(!isLogged) return <Navigate to={redirectTo} />;

  return children;
}
