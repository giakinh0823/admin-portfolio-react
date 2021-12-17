
import { Navigate } from "react-router-dom";


export default function PrivateRoute({ children, redirectTo }: any) {
  const auth = true;

  return auth ? children : <Navigate to={redirectTo} />;
}
