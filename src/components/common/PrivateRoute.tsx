import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { authActions, selectIsLoggedIn } from "../../features/Auth/authSlice";

export default function PrivateRoute({ children, redirectTo }: any) {
  const dispatch = useAppDispatch();
  const isLogged = Boolean(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const goToLogin = React.useCallback(() => {
    navigate(redirectTo);
  }, [navigate, redirectTo]);

  React.useEffect(() => {
    if (isLogged) {
      try {
        dispatch(authActions.getUser());
      } catch (error: any) {
        goToLogin();
      }
    }
  }, [dispatch, isLogged, goToLogin, isLoggedIn]);

  if (!isLogged) return <Navigate to={redirectTo} />;

  return children;
}
