import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PublicRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PublicRoute = ({
  component: Component,
  redirectTo = "/",
}: PublicRouteProps) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLogged);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
