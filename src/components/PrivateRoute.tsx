import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLogged);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
