import { Outlet } from "react-router-dom";

export const AuthPage = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <Outlet />
    </div>
  );
};
