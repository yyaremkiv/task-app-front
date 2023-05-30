import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PublicRoute = ({
  component: Component,
  redirectTo = "/",
}: PublicRouteProps) => {
  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  };

  return isLoggedIn() ? <Navigate to={redirectTo} /> : Component;
};
